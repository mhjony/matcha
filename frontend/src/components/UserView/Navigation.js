import React from 'react'
import { NavLink } from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faUser, faComments } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import Notifications from '../Notifications'
import logoutService from '../../services/logoutService'

const NavigationLink = ({ icon, children, ...props }) =>

	<Nav.Link as={NavLink} {...props} >
		{icon ? <FontAwesomeIcon icon={icon} /> : ''} {children}
	</Nav.Link>

const Navigation = (props) => {

	const { user, wsClient, userInfoComplete, ...notificationProps } = props


	return <Navbar className='nav' fixed='top'>

		<Nav id='title'>
			<NavigationLink to='/' title='frontpage' icon={faHeart}>
				<span className='hide-on-mobile'> matcha</span>
			</NavigationLink>
		</Nav>

		{user && user.user_id
			? userInfoComplete(user)
				? <Nav>
					<NavigationLink to='/matches' title='chat' icon={faComments} />

					<NavigationLink to='/profile' title='your profile' icon={faUser} />

					<NavigationLink to="/login" title='logout' onClick={() => logoutService.handleLogout(wsClient, user.user_id)} icon={faSignOutAlt} />

					<Notifications {...notificationProps} />

				</Nav>
				: null

			: <Nav>

				<NavigationLink to='/signup' title='signup'>signup</NavigationLink>

				<NavigationLink to='/login' title='login'>login</NavigationLink>

			</Nav>
		}

	</Navbar >
}

export default Navigation