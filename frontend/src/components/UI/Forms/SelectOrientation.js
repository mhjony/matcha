import React from 'react'
import Select from 'react-select'
import { Controller } from 'react-hook-form'
import { Form } from 'react-bootstrap'

const SelectOrientation = ({ orientation, control, errors }) => {

	const options = [
		{ value: 'female', label: 'female' },
		{ value: 'male', label: 'male' },
		{ value: 'other', label: 'other' }
	]

	//console.log('orientation at select orientation', orientation)

	const defVal = () => orientation ? orientation.map(o => ({ value: o, label: o })) : ''

	return 	<Form.Group>
		<Form.Label htmlFor='select-orientation'>looking for</Form.Label>
		{errors.orientation && errors.orientation.type === 'required' && (<span className='text-danger'> *</span>)}<br />

		<Controller
			class='form-control'
			id='select-orientation'
			name='orientation'
			as={Select}
			options={options}
			value={defVal()}
			defaultValue={defVal()}
			control={control}
			rules={{ required: true }}
			isMulti />
	</Form.Group>
}

export default SelectOrientation
