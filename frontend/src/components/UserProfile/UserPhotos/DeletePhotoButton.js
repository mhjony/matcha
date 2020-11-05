import React from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import photoService from '../../../services/photoService'

const DeletePhotoButton = ({ photo, user, setUser }) => {

	const handleDelete = () => {

		photoService
			.deletePhoto(photo.id)
			.then(() => {

				if (photo.profilePic) {
					const newProfilePic = user.photos.find(p => !p.profilePic)

					if (newProfilePic) {
						photoService
							.toggleProfilePhoto(newProfilePic.id, 1)
							.then(() => {
								const updatedUser = {
									...user,
									photos: user.photos
										.filter(p => p.id !== photo.id)
										.map(p => p.id === newProfilePic.id
											? { ...p, profilePic: 1 }
											: p)
								}
								setUser(updatedUser)
							})
					} else {
						const updatedUser = {
							...user,
							photos: user.photos.filter(p => p.id !== photo.id)
						}
						setUser(updatedUser)
					}
				} else {
					const updatedUser = {
						...user,
						photos: user.photos.filter(p => p.id !== photo.id)
					}
					setUser(updatedUser)
				}
			})
			.catch(e => {
				console.log('error at delete photo', e)
			})
	}

	return <Button size="sm" variant="danger" onClick={handleDelete}>
		<FontAwesomeIcon icon={faTrash} />
	</Button>
}

export default DeletePhotoButton