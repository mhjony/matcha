import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import photoService from '../../../services/photoService'
import UploadPhoto from './UploadPhoto'

const UploadModal = ({ user, setUser, showModal, closeModal }) => {

	const [photo, setPhoto] = useState({})
	const [uploadDisabled, setUploadDisabled] = useState(true)

	const handleUpload = e => {
		e.preventDefault()

		photoService
			.addPhoto({
				user_id: user.user_id,
				...photo
			})
			.then(data => {
				const newPhoto = {
					id: data.id,
					...photo
				}
				const updatedUser = {
					...user,
					photos: user.photos
						? user.photos.concat(newPhoto)
						: [newPhoto]
				}

				closeModal()
				setPhoto({})
				setUploadDisabled(true)
				setUser(updatedUser)
			})
			.catch(e => {
				console.log('Database error', e)
			})
	}

	const isProfilePic = () => user.photos && user.photos.length > 0
		? 0
		: 1


	return <Modal show={showModal} onHide={closeModal}>
		<Modal.Header closeButton>
			<Modal.Title>Upload photo</Modal.Title>
		</Modal.Header>
		<Modal.Body>
			<UploadPhoto photo={photo} setPhoto={setPhoto} profilePic={isProfilePic()}
				setUploadDisabled={setUploadDisabled} />
		</Modal.Body>
		<Modal.Footer>
			<Button variant="secondary" onClick={closeModal}>
                    Close
			</Button>
			<Button variant="primary" onClick={handleUpload} disabled={uploadDisabled}>
                    Upload
			</Button>
		</Modal.Footer>
	</Modal>
}

export default UploadModal