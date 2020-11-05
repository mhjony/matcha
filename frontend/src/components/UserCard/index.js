import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faHeart } from '@fortawesome/free-solid-svg-icons'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'

const UserCard = ({ user }) => {

	const [selectedPhoto, setSelectedPhoto] = useState(null)
	const profilePic = user.photos
		? user.photos.find(p => p.profilePic)
		: null

	useEffect(() => {
		setSelectedPhoto(profilePic)
	}, [profilePic])

	const changePhoto = id => setSelectedPhoto(user.photos.find(p => p.id === id))

	const photoSelector = id => selectedPhoto
		? selectedPhoto.id === id
			? <FontAwesomeIcon icon={faCircle} color="gold" />
			: <FontAwesomeIcon icon={faCircle} />
		: null

	return <Card className="w-100 m-auto">
		<Card.Img variant="top" src={selectedPhoto ? selectedPhoto.photoStr : null} />
		<Card.Body className="text-center">
			<Card.Link onClick={() => changePhoto(profilePic.id)}>
				{photoSelector(profilePic.id)}
			</Card.Link>
			{user.photos
				.filter(p => !p.profilePic)
				.map(p => <Card.Link key={p.id} onClick={() => changePhoto(p.id)}>
					{photoSelector(p.id)}
				</Card.Link>)}
		</Card.Body>
		<Card.Body>
			<Card.Title>{user.username}</Card.Title>
			<Card.Text>
				{user.bio}
			</Card.Text>
		</Card.Body>
		<ListGroup className="list-group-flush">
			<ListGroupItem>{user.gender}</ListGroupItem>
			<ListGroupItem>
				looking for {user.orientation
					.map((o, i) => i < user.orientation.length - 1
						? `${o}, `
						: o
					)}
			</ListGroupItem>

			{user.tags
				? <ListGroupItem>
					{user.tags.split('#')
						.map((t, i) => i > 1
							? ` #${t}`
							: i === 1 ? `#${t}` : null
						)}
				</ListGroupItem>
				: null}
		</ListGroup>
		<Card.Body>
			<Card.Link href="#"><FontAwesomeIcon icon={faHeart} /> Like</Card.Link>
			<Card.Link href="#">Next</Card.Link>
		</Card.Body>
	</Card>

}

export default UserCard