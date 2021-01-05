import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'


const SelectorIcon = ({ selected, handleClick }) => {

	return <Card.Link href="#" onClick={handleClick}>
		<FontAwesomeIcon icon={faCircle} color={ selected ? 'gold' : 'grey' } />
	</Card.Link>
}

const PhotoSelector = ({ selectedPhoto, setSelectedPhoto, profilePic, photos }) => {

	const changePhoto = id => setSelectedPhoto(photos.find(p => p.id === id))

	return <Card.Body className="text-center">

		<SelectorIcon
			selected={ selectedPhoto.id === profilePic.id }
			handleClick={ () => changePhoto(profilePic.id) }
		/>

		{ photos
			.filter(p => !p.profilePic)
			.map(p => <SelectorIcon
				key={p.id}
				selected={ selectedPhoto.id === p.id }
				handleClick={ () => changePhoto(p.id) }
			/>
			)}
	</Card.Body>
}

const Photos = ({ photos }) => {

	const [selectedPhoto, setSelectedPhoto] = useState(null)
	const profilePic = photos ? photos.find(p => p.profilePic) : null

	useEffect(() => {
		setSelectedPhoto(profilePic)
	}, [profilePic])

	const photoSelectorProps = {
		selectedPhoto, setSelectedPhoto, profilePic, photos
	}

	return selectedPhoto && <>
		<Card.Img src={selectedPhoto.photoStr} />
		<PhotoSelector {...photoSelectorProps} />
	</>
}

export default Photos