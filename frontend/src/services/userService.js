import axios from 'axios'
import auth from '../utils/auth'
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

const getAll = async () => {
	const resp = await axios.get(baseUrl, auth.config())

	return resp.data.map(u => ({
		...u,
		orientation: orientationFromDb(u.orientation)
	}))
}

const getUser = async userId => {
	if (!userId)
		return

	const resp = await axios.get(`${baseUrl}/${userId}`, auth.config())

	if (!resp.data[0])
		return resp.data

	// eslint-disable-next-line no-unused-vars
	const { first_name, last_name, id, profile_pic, photo_str, orientation, ...user } = resp.data[0]

	if (resp.data[0].id && resp.data[0].profile_pic !== undefined && resp.data[0].photo_str) {

		user.photos = resp.data.map(r => {
			return ({ id: r.id, photoStr: r.photo_str, profilePic: r.profile_pic })
		})
	}

	return ({
		...user,
		firstName: first_name,
		lastName: last_name,
		orientation: orientationFromDb(orientation),
		age: resp.data[0].age.years
	})
}

const updateUser = async (userObject, id) => {

	const resp = await axios.patch(`${baseUrl}/${id}`, userObject, auth.config())

	if (resp.data.first_name) {
		let { first_name, ...userObject } = resp.data
		userObject.firstName = first_name
	}

	if (resp.data.last_name) {
		let { last_name, ...userObject } = resp.data
		userObject.lastName = last_name
	}

	if (resp.data.orientation)
		userObject.orientation = orientationFromDb(resp.data.orientation)

	return userObject
}

const createUser = async userObject => {
	const resp = await axios.post(baseUrl, userObject)
	return resp.data
}

const getByGenderOrientation = async (gender, orientation) => {
	const genderStr = gender.map(o => o.substring(0,1)).join('')
	const resp = await axios
		.get(`${baseUrl}?gender=${genderStr}&orientation=${orientation.substring(0,1)}`, auth.config())
	return resp.data
}

export default { getAll, getUser, updateUser, createUser, getByGenderOrientation }