import React, { useState } from 'react'
import { Form, ResponsiveEmbed, Image } from 'react-bootstrap'


const UploadFirstPhoto = ({ photo, setPhoto }) => {
	const [errorMessage, setErrorMessage] = useState(null)

	const handleImageChange = e => {
		e.preventDefault()

		let reader = new FileReader()
		let file = e.target.files[0]

		if (!file)
			return

		if (file.size > 350000) {
			setErrorMessage('Max photo size is 350kb')
			return
		}

		reader.onloadend = () => {
			setPhoto({ photoStr: reader.result })
		}
		reader.readAsDataURL(file)
		setErrorMessage('')
	}

	const imagePreview = () => photo && photo.photoStr
		? <ResponsiveEmbed aspectRatio="1by1" className="w-50 m-auto">
			<div className="d-flex" >
				<Image src={photo.photoStr} alt="upload preview" title="upload preview"
					className="img-fluid d-block m-auto" style={{ maxWidth: '100%', maxHeight: '100%' }} />
			</div>
		</ResponsiveEmbed>
		: null

	return <>
		<Form className="text-center">
			{imagePreview()}
			{
				photo && photo.profilePic
					? null
					: <Form.Group>
						<Form.Label htmlFor="photo-upload" className="btn btn-primary mt-3">Choose photo</Form.Label>
						<Form.Control id="photo-upload" type="file"
							accept=".png, .jpg, .jpeg" onChange={handleImageChange} className='w-50 m-auto' />
					</Form.Group>
			}
			{errorMessage && <div className="text-center text-danger" >{errorMessage}</div>}
		</Form>
	</>
}

export default UploadFirstPhoto