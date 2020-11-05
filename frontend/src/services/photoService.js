import axios from 'axios'
const baseUrl = 'http://localhost:3001/photos'

const addPhoto = async photo => {
	const resp = await axios.post(baseUrl, photo)
	return resp.data
}

const deletePhoto = async id => {
	await axios.delete(`${baseUrl}/${id}`)
}

const toggleProfilePhoto = async (id, profilePic) => {
	const resp = await axios.put(`${baseUrl}/${id}`, { profilePic: profilePic })
	return resp.data
}

export default { addPhoto, deletePhoto, toggleProfilePhoto }