import axios from 'axios'
const baseUrl = 'http://localhost:3001/login'

const login = async credentials => {
	const resp = await axios.post(baseUrl, credentials)
	const { first_name, last_name, ...user } = resp.data
  
	return ({
		...user,
		firstName: resp.data.first_name,
		lastName: resp.data.last_name
	})
}

export default { login }