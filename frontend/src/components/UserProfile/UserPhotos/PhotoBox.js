import React, { useState } from 'react'
import { Image, ResponsiveEmbed, ButtonGroup } from 'react-bootstrap'
import ProfilePicButton from './ProfilePicButton'
import DeletePhotoButton from './DeletePhotoButton'

const PhotoBox = ({ photo, user, setUser, profilePic }) => {

	const [hovered, setHovered] = useState(false)
	
	const imgStyle = {
		maxWidth: hovered ? '105%' : '100%',
		maxHeight: hovered ? '105%' : '100%'
	}

	const buttonStyle = {
		display: hovered ? "block" : "none",
		position: "absolute",
		bottom: "5px",
		right: "5px"
	}

	return <ResponsiveEmbed aspectRatio="1by1">
		<div className="border d-flex align-items-center img-fluid"
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}>
			<Image src={photo.photoStr} alt={user.username}
				title={user.username} className="d-block m-auto"
				style={imgStyle} />
			<ButtonGroup style={buttonStyle}>
				<ProfilePicButton photo={photo} profilePic={profilePic} user={user} setUser={setUser} />
				<DeletePhotoButton photo={photo} user={user} setUser={setUser} />
			</ButtonGroup>
		</div>
	</ResponsiveEmbed>
}

export default PhotoBox