import React, { useState } from 'react'

const UploadPhoto = ({ photo, setPhoto, profilePic, setUploadDisabled }) => {
    const [errorMessage, setErrorMessage] = useState(null)

    const handleImageChange = e => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

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
        ? <img src={photo.photoStr} alt="upload preview" title="upload preview"
            className="img-fluid d-block" />
        : null

    return <>
        <form className="text-center">
            <div className="border d-flex align-items-center" >
                {imagePreview()}
            </div>
            <div className="input-group">
                <input className="form-control" type="file"
                    accept=".png, .jpg, .jpeg" onChange={handleImageChange} />
            </div>
            {errorMessage && <div className="text-center text-danger" >{errorMessage}</div>}
        </form>
    </>
}

export default UploadPhoto