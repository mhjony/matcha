import axios from 'axios'
import auth from '../utils/auth'
const baseUrl = 'http://localhost:3001/photos'

const addPhoto = async photo => {
	const resp = await axios.post(baseUrl, photo, auth.config())
	return resp.data
}

const deletePhoto = async id => {
	await axios.delete(`${baseUrl}/${id}`, auth.config())
}

const toggleProfilePhoto = async (id, profilePic) => {
	const resp = await axios.put(`${baseUrl}/${id}`, { profilePic: profilePic }, auth.config())
	return resp.data
}

export default { addPhoto, deletePhoto, toggleProfilePhoto }