import axios from 'axios'
import auth from '../utils/auth'
const baseUrl = 'http://localhost:3001/notifications'

const getNotifications = async user_id => {
	const resp = await axios.get(`${baseUrl}?user_id=${user_id}`, auth.config())
	return resp.data
}

const notify = async notification => {
	const resp = await axios.post(baseUrl, notification, auth.config())
	return resp.data
}

const markAsRead = async id => {
	const resp = await axios.patch(`${baseUrl}/${id}`, { read: 1 }, auth.config())
	return resp.data
}

const markAllAsRead = async () => {
	const resp = await axios.patch(`${baseUrl}`, { read: 1 }, auth.config())
	return resp.data
}

export default { getNotifications, notify, markAsRead, markAllAsRead }