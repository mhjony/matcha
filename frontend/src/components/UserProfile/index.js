import React from 'react'
import UserPhotos from './UserPhotos'
import UpdateUserForm from './UpdateUserForm'

const UserProfile = ({ user, setUser }) => {

	return <div>
		<h1 className="text-center mt-3">{user.username}</h1>

		<div className="row justify-content-center align-items-center">

			<div className="text-left mt-3 col-md-6 col-sm-6 col-lg-4 col-xs-8">

				<UserPhotos user={user} setUser={setUser} />
				<UpdateUserForm user={user} setUser={setUser} />

			</div>
		</div>
	</div>
}

export default UserProfile;