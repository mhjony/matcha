import axios from 'axios'
const baseUrl = 'http://localhost:3001/users'

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

const responseDataToApp = data => {

	const { first_name, last_name, id, profile_pic, photo_str, orientation, ...user } = data[0]

	if (data[0].id && data[0].profile_pic !== undefined && data[0].photo_str) {

		user.photos = data.map(r => {
			return ({ id: r.id, photoStr: r.photo_str, profilePic: r.profile_pic })
		})
	}
	
	return ({
		...user,
		firstName: first_name,
		lastName: last_name,
		orientation: orientationFromDb(orientation)
	})
}

const getAll = async () => {
	const resp = await axios.get(baseUrl)
	return resp.data
}

const getUser = async id => {
	const resp = await axios.get(`${baseUrl}/${id}`)
	return responseDataToApp(resp.data)
}

const updateUser = async (userObject, id) => {
	const resp = await axios.put(`${baseUrl}/${id}`, userObject)

	const { first_name, last_name, orientation, ...user } = resp.data

	return ({
		...user,
		firstName: first_name,
		lastName: last_name,
		orientation: orientationFromDb(orientation)
	})
}

const createUser = async userObject => {
	const resp = await axios.post(baseUrl, userObject)
	return resp.data
}

export default { getAll, getUser, updateUser, createUser }