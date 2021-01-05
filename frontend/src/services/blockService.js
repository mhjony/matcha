import axios from 'axios'
import auth from '../utils/auth'
const baseUrl = 'http://localhost:3001/block'

const block = async user_id => {
	const resp = await axios.post(baseUrl, { to_user_id: user_id }, auth.config())
	return resp.data
}

const getAllBlocked = async () => {
	const resp = await axios.get(baseUrl, auth.config())
	return resp.data
}

const getBlockedId = async user_id => {
	const resp = await axios.get(`${baseUrl}?user_id=${user_id}`, auth.config())
	return resp.data
}

const getBlockedByUser = async user_id => {
	const resp = await axios.get(`${baseUrl}?from_user_id=${user_id}`, auth.config())
	return resp.data
}

const unblockUser = async id => {
	const resp = await axios.delete(`${baseUrl}/${id}`, auth.config())
	return resp.data
}

export default { block, getAllBlocked, getBlockedId, getBlockedByUser, unblockUser }