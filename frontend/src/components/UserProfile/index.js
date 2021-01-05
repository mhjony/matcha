import React from 'react'
import UserPhotos from './UserPhotos'
import UpdateUserForm from './UpdateUserForm'
import Map from './Map/index'
import VisitHistory from './VisitHistory/index.js'
import BlockList from './BlockList/index'
import Togglable from '../UI/Togglable'


const UserProfile = ({ user, setUser }) => {

	return <>
		<h1>{user.username}</h1>
		<div className='text-left pt-3'>

			<Togglable title='Photos'>
				<UserPhotos user={user} setUser={setUser} />
			</Togglable>
			<hr />

			<Togglable title='User information'>
				<UpdateUserForm user={user} setUser={setUser} />
			</Togglable>
			<hr />

			<Togglable title='Location'>
				<Map user={user} setUser={setUser} />
			</Togglable>
			<hr />

			<Togglable title='Visit history'>
				<VisitHistory user={user} value={"fromprofile"}/>
			</Togglable>
			<hr />

			<Togglable title='Blocked users'>
				<BlockList user={user} />
			</Togglable>
		</div>
	</>
}

export default UserProfile