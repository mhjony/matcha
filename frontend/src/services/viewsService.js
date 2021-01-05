import axios from 'axios'
const baseUrl = 'http://localhost:3001/views'
const viewsListUrl = 'http://localhost:3001/views/list'


const views = async userObject => {
	const resp = await axios.post(baseUrl, userObject)
	return resp.data
}

const viewsHistory = async userObject => {
	const resp = await axios.post(viewsListUrl, userObject)
	return resp.data
}

export default { views, viewsHistory }