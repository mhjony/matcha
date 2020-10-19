import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import userService from './services/userService'
import UpdateForm from './components/UpdateForm/'
import Signup from './components/Signup'
import Login from './components/Login'
import Verify from './components/Verify'
import './style/app.css'


const UserList = ({ users }) => {
	return users
		? <div>
			<h2>users</h2>
			<ul>
				{users.map(u => {
					return <li key={u.user_id}>{u.user_id}: {u.username}, {u.email}, {u.gender} looking for {u.orientation} </li>
				})}
			</ul>
		</div>
		: null
}


const App = () => {
	const [users, setUsers] = useState(false)
	const [user, setUser] = useState({})

	useEffect(() => {
		userService
			.getAll()
			.then(u => {
				//console.log(users)
				setUsers(u)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedMatchaUser')
		if (loggedUserJSON) {
			const userFromLocalStorage = JSON.parse(loggedUserJSON)
			userService
				.getUser(userFromLocalStorage.user_id)
				.then(data => {
					setUser(data)
				})
		}
	}, [])

	return (
		<Router>
			<div className="nav">
				<Link to="/">home</Link>
				{user.username
					? <><Link to="/update">update</Link>
						<div>user: {user.username}</div></>
					: <><Link to="/signup">signup</Link>
						<Link to="/login">login</Link></>}
			</div>
			<Switch>
				<Route path="/update" render={() =>
					user.user_id ? <UpdateForm user={user} setUser={setUser} /> : <Redirect to="/login" />
				} />
				<Route path="/signup">
					<Signup />
				</Route>
				<Route path="/login" render={() =>
					user.user_id ? <Redirect to="/" /> : <Login setUser={setUser} />
				} />
				<Route path="/verify">
					<Verify setUser={setUser} />
				</Route>
				<Route path="/">
					<UserList users={users} />
				</Route>
			</Switch>
			<footer>
				this is footer
			</footer>
		</Router>
	)
}

export default App;