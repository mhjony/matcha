import React, { useState, useEffect } from 'react'
import { useField } from '../../hooks'
import InputField from './InputField'
import SelectGender from './SelectGender'
import SelectOrientation from './SelectOrientation'
import SelectTags from './SelectTags'
import Textarea from './Textarea'
import userService from '../../services/userService'
import tagService from '../../services/tagService'

const UpdateForm = ({ user, setUser }) => {

	const { reset: firstNameReset, ...firstName } = useField('text', user.firstName)
	const { reset: lastNameReset, ...lastName } = useField('text', user.lastName)
	const { reset: usernameReset, ...username } = useField('text', user.username)
	const { reset: emailReset, ...email } = useField('email', user.email)
	const { reset: passwordReset, ...password } = useField('password')
	const [ gender, setGender ] = useState(user.gender)
	const [ orientation, setOrientation ] = useState(user.orientation)
	const [ tags, setTags ] = useState(false)
	const [ userTags, setUserTags ] = useState(user.tags)
	const [ bio, setBio ] = useState(user.bio || '')
	const [ errorMessage, setErrorMessage ] = useState('')

	useEffect(() => {
		tagService
			.getTags()
			.then(data => {
				setTags(data)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])

	const handleSubmit = e => {
		e.preventDefault()

		const updatedUser = {
			firstName: firstName.value ? firstName.value : user.firstName,
			lastName: lastName.value ? lastName.value : user.lastName,
			username: username.value ? username.value : user.username,
			email: email.value ? email.value : user.email,
			password: password.value ? password.value : user.password,
			gender: gender,
			orientation: orientation,
			tags: userTags,
			bio: bio
		}

		console.log('updateduser', updatedUser)

		userService
			.updateUser(updatedUser, user.user_id)
			.then(data => {
				console.log('data when updated', data)
				setUser(data)
				setErrorMessage('')
				//todo: clear fields
			})
			.catch(e => {
				console.log('error', e.response.data)
				setErrorMessage(e.response.data.error)
			})
	}

	//console.log('user', user)
	//console.log('orientation', orientation)
	//console.log('user', user)
	//console.log('gender', gender)

	return <div>
			{ errorMessage && 
		   		<div><strong>{errorMessage}</strong></div>
			}
			<h2 className="text-center mt-3">Update user</h2>
			<div className="row justify-content-center align-items-center">
				
				<form className="text-left mt-3 col-md-6 col-sm-6 col-lg-4 col-xs-8" onSubmit={handleSubmit}>
					<InputField label='first name' field={firstName} current={user.firstName} />
					<InputField label='last name' field={lastName} current={user.lastName} />
					<InputField label='username' field={username} current={user.username} />
					<InputField label='email' field={email} current={user.email} />
					<InputField label='password' field={password} current='' />
					<SelectGender name='gender' setGender={setGender} gender={gender} />
					<SelectOrientation name='orientation' setOrientation={setOrientation} orientation={orientation} />
					<SelectTags name='tags' setUserTags={setUserTags} userTags={userTags}
						tags={tags} setTags={setTags} />
					<Textarea value={bio} setValue={setBio} label='bio' name='bio' />
					<button className="btn btn-success mt-3" type="submit">Update</button>
				</form>
			</div>
		</div>
}

export default UpdateForm;