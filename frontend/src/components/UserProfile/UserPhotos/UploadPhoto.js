import React, { useState } from 'react'
import { Form, Image, ResponsiveEmbed } from 'react-bootstrap'

const UploadPhoto = ({ photo, setPhoto, profilePic, setUploadDisabled }) => {
	const [errorMessage, setErrorMessage] = useState(null)

	const handleImageChange = e => {
		e.preventDefault()

		let reader = new FileReader()
		let file = e.target.files[0]

		if (!file)
			return

		if (file.size > 350000) {
			setErrorMessage('Max photo size is 350kb')
			if (!photo)
				setUploadDisabled(true)
			return
		}

		reader.onloadend = () => {
			setPhoto({
				photoStr: reader.result,
				profilePic
			})
		}
		reader.readAsDataURL(file)
		setUploadDisabled(false)
		setErrorMessage('')
	}

	const imagePreview = () => photo.photoStr
		? <ResponsiveEmbed aspectRatio="1by1">
			<div className="border d-flex" >
				<Image src={photo.photoStr} alt="upload preview" title="upload preview"
					className="img-fluid d-block m-auto" style={{ maxWidth: '100%', maxHeight: '100%' }} />
			</div>
		</ResponsiveEmbed>
		: null

	return <>
		<Form className="text-center">

			{imagePreview()}

			<Form.Group>
				<Form.Label htmlFor="upload" className="btn btn-primary mt-3">Choose photo</Form.Label>
				<Form.Control id="upload" type="file"
					accept=".png, .jpg, .jpeg" onChange={handleImageChange} />
			</Form.Group>
			{errorMessage && <div className="text-center text-danger" >{errorMessage}</div>}
		</Form>
	</>
}

export default UploadPhoto