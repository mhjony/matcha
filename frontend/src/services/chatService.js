import axios from 'axios'
import auth from '../utils/auth'

const baseUrl = 'http://localhost:3001/chat'

const getChatHistory = async () => {
	const resp = await axios.get(`${baseUrl}`, auth.config())
	return resp.data
}

export default { getChatHistory }