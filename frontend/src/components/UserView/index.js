import React, { useEffect } from 'react'
import { useLocation, Switch, Route, Redirect, useHistory } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import UserProfile from '../UserProfile'
import Signup from '../Signup'
import Login from '../Login'
import Verify from '../Verify'
import Forgot from '../ForgotPassword'
import Reset from '../ForgotPassword/resetNewPasswd'
import UserBrowser from '../UserBrowser'
import Matches from '../Matches'
import Navigation from './Navigation'
import UserInfoForm from './UserInfoForm'
import NotificationsList from '../Notifications/NotificationsList'
import notificationService from '../../services/notificationService'
import '../../style/userView.css'

const UserView = ({ user, setUser, matches, setMatches, notifications, setNotifications,
	chatToShow, setChatToShow, wsClient }) => {

	const history = useHistory()
	let location = useLocation()

	useEffect(() => {
		if (user.user_id) {
			notificationService
				.getNotifications(user.user_id)
				.then(res => {
					setNotifications(res)
				})
				.catch(e => {
					console.log('Database error', e)
				})
		}

	}, [user.user_id, setNotifications])

	const userInfoComplete = user => {
		return user.firstName && user.lastName && user.username && user.email && user.gender && user.orientation
	}

	const handleNotificationClick = data => {
		notificationService
			.markAsRead(data.id)
			.then(() => {
				if (data.notification.endsWith('viewed your profile') ||
					data.notification.endsWith('likes you'))
					history.push(`browse/?user_id=${data.from_id}`)
				else if (data.notification.startsWith('New message from') ||
					data.notification.startsWith('New match with') ||
					data.notification.startsWith('No longer match with'))
					history.push('/matches')
				setNotifications(notifications.map(n => n.id === data.id ? ({ ...n, read: 1 }) : n))

			})
	}

	const markAllNotificationsRead = () => {
		notificationService
			.markAllAsRead(user.user_id)
			.then(() => {
				setNotifications(notifications.map(n => ({ ...n, read: 1 })))
			})
			.catch(e => {
				console.log('Database error', e)
			})
	}

	const matchProps = {
		user, matches, chatToShow, setChatToShow, wsClient
	}

	const notificationProps = {
		notifications, handleNotificationClick, markAllNotificationsRead
	}

	const navigationProps = {
		user, wsClient, userInfoComplete, ...notificationProps
	}

	const userInfoFormProps = {
		user, setUser
	}

	return <>
		<Navigation {...navigationProps} />

		<Container id="main-container" fluid="lg">
			<div id="middle-column">
				<Switch>
					<Route path="/" exact={true} render={() => {
						return user.user_id
							? userInfoComplete(user)
								? <Redirect to="/browse" />
								: <UserInfoForm {...userInfoFormProps} />
							: <Redirect to="/login" />
					}} />

					<Route path="/browse" render={() => {

						const showUser = location && location.search.indexOf('user_id=') &&
							Number(location.search.substring(location.search.indexOf('user_id=') + 8))

							? Number(location.search.substring(location.search.indexOf('user_id=') + 8))
							: null

						return user.user_id && userInfoComplete(user)
							? <UserBrowser user={user} wsClient={wsClient} showUserAtLoad={showUser} matches={matches} setMatches={setMatches} />
							: <Redirect to="/" />
					}} />
					<Route path="/signup" component={Signup} />
					<Route path="/forgot" component={Forgot} />
					<Route path="/reset-password/:token" component={Reset} />
					<Route path="/login" render={() => user.user_id
						? <Redirect to="/" />
						: <Login setUser={setUser} wsClient={wsClient} />
					} />
					<Route path="/verify" render={() => user.user_id
						? <Redirect to="/" />
						: <Verify setUser={setUser} wsClient={wsClient} />
					} />
					<Route path="/profile" render={() => user.user_id && userInfoComplete(user)
						? <UserProfile user={user} setUser={setUser} />
						: <Redirect to="/" />
					} />
					<Route path="/matches" render={() => user.user_id
						? <Matches {...matchProps} />
						: <Redirect to="/" />
					} />
					<Route path="/notifications" render={() => user.user_id
						? <NotificationsList notifications={notifications} handleClick={handleNotificationClick} markAllAsRead={markAllNotificationsRead} />
						: <Redirect to="/" />
					} />
				</Switch>
			</div>
		</Container>
		<footer>
			<Container fluid="lg">
				lapaset & mhjony 2020
			</Container>
		</footer>

	</>
}


export default UserView