import React, { useState } from 'react'
import { ResponsiveEmbed, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import UploadModal from './UploadModal'

const EmptyBox = ({ user, setUser }) => {

	const [showModal, setShowModal] = useState(false)
	const openModal = () => setShowModal(true)
	const closeModal = () => setShowModal(false)

	const buttonStyle = {
		position: "absolute",
		bottom: "5px",
		right: "5px"
	}

	return <ResponsiveEmbed aspectRatio="1by1">
		<div className="border d-flex align-items-center">
			<Button size="sm" variant="light" onClick={openModal} style={buttonStyle}>
				<FontAwesomeIcon icon={faPlus} />
			</Button>
			<UploadModal user={user} setUser={setUser} showModal={showModal}
				closeModal={closeModal} />
		</div>
	</ResponsiveEmbed>
}

export default EmptyBox