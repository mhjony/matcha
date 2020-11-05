import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import EmptyBox from './EmptyBox'
import PhotoBox from './PhotoBox'

const UserPhotos = ({ user, setUser }) => {

	const [profilePic, setProfilePic] = useState(null)
	const maxPhotos = 5
	const emptyPhotos = () => user.photos ? maxPhotos - user.photos.length : maxPhotos

	const profilePhoto = () => profilePic
		? <Col>
			<PhotoBox photo={profilePic} user={user}
				setUser={setUser} profilePic={profilePic} />
		</Col>
		: null

	const photoBoxes = () => user.photos
		? user.photos.map(p => p.profilePic
			? null
			: <Col xs={6} key={p.id}>
				<PhotoBox photo={p} user={user} setUser={setUser} profilePic={profilePic} />
			</Col>)
		: null

	const emptyBoxes = () => [...Array(emptyPhotos())]
		.map((e, i) =>
			<Col xs={6} key={i}>
				<EmptyBox photo={null} user={user} setUser={setUser} />
			</Col>)

	useEffect(() => {
		if (user.photos && user.photos.length > 0)
			setProfilePic(user.photos.find(p => p.profilePic))
		else
			setProfilePic(null)
	}, [user.photos])

	return <Container>
		<Row noGutters={true} >
			{profilePhoto()}
		</Row>
		<Row noGutters={true} >
			{photoBoxes()}
			{console.log(emptyPhotos())}
			{emptyPhotos() ? emptyBoxes() : null}
		</Row>
	</Container>

}

export default UserPhotos
