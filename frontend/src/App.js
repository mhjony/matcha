import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './style/app.css'
import userService from './services/userService'
import notificationService from './services/notificationService'
import likeService from './services/likeService'
import chatService from './services/chatService'
import socket from './socket'
import auth from './utils/auth'
import UserView from './components/UserView'

const App = () => {

	const [user, setUser] = useState({})
	const [matches, setMatches] = useState([])
	const [notifications, setNotifications] = useState(null)
	const [chatToShow, setChatToShow] = useState(null)

	var wsClient = useRef({})
	const loadingUser = useRef(true)

	const props = {
		user, setUser, matches, setMatches, notifications, setNotifications,
		chatToShow, setChatToShow, wsClient
	}

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedMatchaUser')

		if (loggedUserJSON) {
			const userFromLocalStorage = JSON.parse(loggedUserJSON)

			auth.setToken(userFromLocalStorage.sessionToken)

			userService
				.getUser(userFromLocalStorage.user_id)
				.then(data => {
					wsClient.current = socket.createWs(userFromLocalStorage.user_id)
					loadingUser.current = false
					setUser(data)
				})
				.catch(e => {
					if (!e.response)
						console.log('Error: no response from the server')
					else
						console.log('Database error', e)
				})

			return () => {
				wsClient.current.send(JSON.stringify(({
					type: 'close',
					from: userFromLocalStorage.user_id
				})))
			}

		} else {

			loadingUser.current = false
			setUser({})
		}
	}, [])

	useEffect(() => {
		if (user.user_id) {
			likeService
				.getMatches(user.user_id)
				.then(res => {
					if (res.length < 1)
						return

					const matchesFromDb = res.map(m => ({
						...m,
						messages: []
					}))

					chatService
						.getChatHistory()
						.then(res => {

							res.forEach(m => {
								const match = matchesFromDb.find(u => u.user_id === m.sender || u.user_id === m.receiver)
								if (match)
									match.messages.push(m)
							})

							setMatches(matchesFromDb)
						})
						.catch(e => {
							console.log('Database error', e)
						})

					setMatches()
				})
				.catch(e => {
					console.log('Database error', e)
				})
		}
	}, [user.user_id])

	useEffect(() => {

		wsClient.current.onmessage = message => {

			const { type, ...dataFromServer } = JSON.parse(message.data)

			if (type === 'message' || type === 'rejected') {

				const updatedMatches = [...matches]

				const match = updatedMatches
					.find(u => u.user_id === dataFromServer.sender || u.user_id === dataFromServer.receiver)

				if (!match)
					return

				match.messages.push(dataFromServer)

				if (type === 'message') {
					if (dataFromServer.receiver === user.user_id && (!chatToShow || chatToShow.user_id !== match.user_id)) {

						socket.sendNotification(wsClient, {
							user_id: user.user_id,
							from_id: match.user_id,
							notification: `New message from ${match.username}`
						})
					}
					else
						setMatches(updatedMatches)
				}

				if (type === 'rejected' && dataFromServer.sender === user.user_id) {
					notificationService
						.notify({
							user_id: dataFromServer.receiver,
							from_id: dataFromServer.sender,
							notification: `New message from ${user.username}`
						})
						.then(() => {
							setMatches(updatedMatches)
						})
						.catch(e => {
							console.log('Database error', e)
						})
				}

			}
			if (type === 'notification' && notifications) {

				if (dataFromServer.notification.startsWith('New match with')) {
					const newMatch = {
						user_id: dataFromServer.from_id,
						username: dataFromServer.notification.slice(15),
						match: 1,
						messages: []
					}
					setMatches(matches.concat(newMatch))
				}

				if (dataFromServer.notification.startsWith('No longer match with'))
					setMatches(matches.filter(m => m.user_id !== dataFromServer.from_id))

				const updatedNotifications = [...notifications]
				updatedNotifications.unshift({ ...dataFromServer })
				setNotifications(updatedNotifications)
			}
		}

	}, [matches, user.user_id, chatToShow, wsClient, notifications, setNotifications, user.username])


	return loadingUser.current
		? null
		: <Router>
			<UserView {...props} />
		</Router>
}

export default App