import React from 'react'
import Select from 'react-select'

const SelectGender = ({ setGender, gender }) => {

	const onChange = option => {
		setGender(option.value)
	}

	const options = [
		{ value: 'female', label: 'female' },
		{ value: 'male', label: 'male' },
		{ value: 'other', label: 'other' }
	]

	return 	<div className="form-group">
				<label>gender</label><br />
				<Select class="form-control" options={options} value={{ value: gender, label: gender }} onChange={onChange} />
			</div>
}

export default SelectGender