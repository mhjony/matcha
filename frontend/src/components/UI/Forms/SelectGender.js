import React from 'react'
import Select from 'react-select'
import { Controller } from 'react-hook-form'
import { Form } from 'react-bootstrap'

const SelectGender = ({ gender, control, errors }) => {

	const options = [
		{ value: 'female', label: 'female' },
		{ value: 'male', label: 'male' },
		{ value: 'other', label: 'other' }
	]

	const defVal = () => gender ? { value: gender, label: gender } : ''

	return 	<Form.Group>
		<Form.Label htmlFor='select-gender'>gender</Form.Label>
		{errors.gender && errors.gender.type === 'required' && (<span className='text-danger'> *</span>)}<br />
		<Controller
			class='form-control'
			id='select-gender'
			name='gender'
			as={Select}
			options={options}
			value={{ value: gender, label: gender }}
			defaultValue={defVal()}
			control={control}
			rules={{ required: true }} />
	</Form.Group>
}

export default SelectGender