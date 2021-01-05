import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form, Button } from 'react-bootstrap'
import userService from '../../../services/userService'
import RequiredInputField from '../../UI/Forms/RequiredInputField'
import PasswordFields from '../../UI/Forms/PasswordFields'
import SelectGender from '../../UI/Forms/SelectGender'
import SelectOrientation from '../../UI/Forms/SelectOrientation'
import SelectTags from '../../UI/Forms/SelectTags'
import BioTextArea from '../../UI/Forms/BioTextArea'
import dbFunctions from '../../../utils/dbFunctions'

const UpdateUserForm = ({ user, setUser }) => {

	const [errorMessage, setErrorMessage] = useState('')
	const [notification, setNotification] = useState('')
	const [userTagsState, setUserTagsState] = useState({
		value: dbFunctions.userTagsFromDb(user.tags),
		inputValue: ''
	})
	const { register, handleSubmit, errors, control, watch, reset } = useForm()

	const onSubmit = data => {

		// eslint-disable-next-line no-unused-vars
		const { password, password2, ...updatedUser } = data

		updatedUser.gender = data.gender.value
		updatedUser.orientation = dbFunctions.orientationToDb(data.orientation)
		updatedUser.tags = userTagsState.value && userTagsState.value.length !== 0
			? userTagsState.value.map(t => t.value).join('')
			: ''

		if (password) {
			updatedUser.password = password
			reset({ password: '', password2: '' })
		}

		userService
			.updateUser(updatedUser, user.user_id)
			.then(data => {
				setErrorMessage('')
				setNotification('user updated')
				setUser({
					...user,
					...data
				})
			})
			.catch(e => {
				if (e.response && e.response.data)
					setErrorMessage(e.response.data.error)
				else
					console.log('Database error', e)

				setNotification('')
			})
	}

	return <Form onSubmit={handleSubmit(onSubmit)} className="mt-3">

		<RequiredInputField label='first name' errors={errors.firstName}
			name="firstName" defVal={user.firstName} maxLen='50' register={register} />

		<RequiredInputField label='last name' errors={errors.lastName}
			name="lastName" defVal={user.lastName} maxLen='50' register={register} />

		<RequiredInputField label='email' errors={errors.email}
			name="email" defVal={user.email} maxLen='255' register={register}
			requirements={{
				pattern: {
					value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{ | }~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
					message: 'not a valid email'
				}
			}} />

		<SelectGender gender={user.gender} control={control} errors={errors} />

		<SelectOrientation orientation={user.orientation} control={control} errors={errors} />

		<SelectTags name='tags' state={userTagsState} setState={setUserTagsState} control={control} errors={errors} />

		<BioTextArea bio={user.bio} register={register} errors={errors.bio} />

		<PasswordFields watch={watch} register={register} errors={errors} />

		{errorMessage && <div className="text-danger" >{errorMessage}</div>}
		{notification && <div className="text-success" >{notification}</div>}

		<div className="text-right mt-3">
			<Button type="submit">Update</Button>
		</div>
	</Form>
}

export default UpdateUserForm