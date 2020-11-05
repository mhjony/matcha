import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import UserProfile from '../UserProfile'
import Signup from '../Signup'
import Login from '../Login'
import Verify from '../Verify'
import Forgot from '../ForgotPassword'
import Reset from '../ForgotPassword/resetNewPasswd'
import UserCard from '../UserCard'
import logoutService from '../../services/logoutService'

const UserView = ({ user, setUser }) => {

	const userInfoComplete = () => {
		return user.firstName && user.lastName && user.username && user.email && user.gender && user.orientation
	}

	console.log(user)


	return <Router>
		<div className="nav">
			<div className="navLeft">
				<Link to="/">matcha</Link>
			</div>
			<div className="navRight">
				{user.username
					? <><Link to="/profile">{user.username}</Link>
						<Link to="/login" onClick={logoutService.handleLogout}>logout</Link></>

					: <><Link to="/signup">signup</Link>
						<Link to="/login">login</Link></>}
			</div>
		</div>
		<Switch>
			<Route path="/profile" render={() =>
				user.user_id
					? userInfoComplete()
						? <UserProfile user={user} setUser={setUser} />
						: <><p className="text-center text-info">fill your info to start matching</p>
							<UserProfile user={user} setUser={setUser} /></>

					: <Redirect to="/login" />
			} />
			<Route path="/signup">
				<Signup />
			</Route>
			<Route path="/forgot">
				<Forgot />
			</Route>
			<Route path="/reset-password/:token">
				<Reset />
			</Route>
			<Route path="/login" render={() =>
				user.user_id ? <Redirect to="/" /> : <Login setUser={setUser} />
			} />
			<Route path="/verify">
				<Verify setUser={setUser} />
			</Route>
			<Route path="/" render={() =>
				user.user_id
					? userInfoComplete() ? <UserCard user={user} /> : <Redirect to="/profile" />
					: <><h1>Welcome</h1></>
			} />
		</Switch>
		<footer>
			this is footer
		</footer>
	</Router>
}

export default UserView