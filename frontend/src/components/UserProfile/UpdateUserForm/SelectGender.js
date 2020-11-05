import React from 'react'
import Select from 'react-select'
import { Controller } from 'react-hook-form'

const SelectGender = ({ gender, control, errors }) => {

	const options = [
		{ value: 'female', label: 'female' },
		{ value: 'male', label: 'male' },
		{ value: 'other', label: 'other' }
	]

	const defVal = () => gender ? { value: gender, label: gender } : ""

	return 	<div className="form-group">
				<label>gender</label>
				{errors.gender && errors.gender.type === 'required' && (<span className="text-danger"> *</span>)}<br />
				<Controller
					class="form-control"
					name="gender"
					as={Select}
					options={options}
					value={{ value: gender, label: gender }}
					defaultValue={defVal()}
					control={control}
					rules={{ required: true }} />
			</div>
}

export default SelectGender