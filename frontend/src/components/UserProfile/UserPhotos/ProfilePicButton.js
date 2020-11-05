import React from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import photoService from '../../../services/photoService'

const ProfilePicButton = ({ photo, profilePic, user, setUser }) => {

	const toggleProfilePic = () => {

		photoService
			.toggleProfilePhoto(photo.id, 1)
			.then(() => {
				photoService
					.toggleProfilePhoto(profilePic.id, 0)
					.then(() => {
						const updatedUser = {
							...user,
							photos: user.photos.map(p => p.id === photo.id
								? { ...p, profilePic: 1 }
								: p.id = profilePic.id
									? { ...p, profilePic: 0 }
									: p)
						}
						setUser(updatedUser)
					})
					.catch(e => {
						console.log('error at toggle profile pic', e);
					})
			})
			.catch(e => {
				console.log('error at toggle profile pic', e);
			})
	}

	return photo.profilePic
		? <Button size="sm" variant="light" disabled>
			<FontAwesomeIcon icon={faUser} color="gold" />
		</Button>
		: <Button size="sm" variant="light" onClick={toggleProfilePic}>
			<FontAwesomeIcon icon={faUser} />
		</Button>
}

export default ProfilePicButton