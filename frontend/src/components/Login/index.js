import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import loginService from '../../services/loginService'
import { userGeoLocation } from '../../modules/geolocate'
import auth from '../../utils/auth'
import socket from '../../socket'

const Login = ({ setUser, wsClient }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState(null)

	useEffect(() => {
		userGeoLocation()
	}, [])

	const handleLogin = event => {
		event.preventDefault()
		const coords = JSON.parse(window.localStorage.getItem('coordinates'))

		loginService
			.login({
				username,
				password,
				longitude: coords ? coords.longitude : null,
				latitude: coords ? coords.latitude : null
			})
			.then(data => {

				window.localStorage.setItem('loggedMatchaUser', JSON.stringify({
					sessionToken: data.sessionToken,
					user_id: data.user_id
				}))
				auth.setToken(data.sessionToken)
				wsClient.current = socket.createWs(data.user_id)
				setUsername('')
				setPassword('')
				setErrorMessage(null)
				setUser(data)
			})
			.catch(e => {
				if (e.response && e.response.data)
					setErrorMessage(e.response.data.error)
				else
					console.log('Database error', e)
			})
	}

	return (
		<>
			<h2 className="text-center mt-3">Login</h2>

			<form onSubmit={handleLogin}>
				{errorMessage && <div className="text-danger" >{errorMessage}</div>}
				<div className="form-group mt-3">
					<input className="form-control"
						type="text"
						name="username"
						value={username}
						onChange={({ target }) => setUsername(target.value)}
						placeholder="Username"
					/>
				</div>
				<div className="form-group mt-3">
					<input className="form-control"
						type="password"
						name="password"
						value={password}
						onChange={({ target }) => setPassword(target.value)}
						placeholder="Password"
					/>
				</div>
				<button className="btn btn-success mt-3" type="submit">Login</button>
				<p className="forgot-password text-right">
					<Link to={'/forgot'}>Forgot password?</Link>
				</p>
			</form>
		</>
	)
}

export default Login