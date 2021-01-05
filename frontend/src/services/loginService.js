import axios from 'axios'

const baseUrl = 'http://localhost:3001/login'

const login = async credentials => {

	const orientationFromDb = orientation => {
		const o = []

		if (!orientation)
			return o
		if (orientation.includes('f'))
			o.push('female')
		if (orientation.includes('m'))
			o.push('male')
		if (orientation.includes('o'))
			o.push('other')
		return o
	}

	const resp = await axios.post(baseUrl, credentials)

	const { orientation, ...user } = resp.data

	return ({
		...user,
		orientation: orientationFromDb(orientation),
	})
}

export default { login }