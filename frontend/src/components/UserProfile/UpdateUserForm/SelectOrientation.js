import React from 'react'
import Select from 'react-select'
import { Controller } from 'react-hook-form'

const SelectOrientation = ({ orientation, control, errors }) => {

	const options = [
		{ value: 'female', label: 'female' },
		{ value: 'male', label: 'male' },
		{ value: 'other', label: 'other' }
	]

	//console.log('orientation at select orientation', orientation)

	const defVal = () => orientation ? orientation.map(o => ({ value: o, label: o })) : ""

	return 	<div className="form-group">
				<label>looking for</label>
				{errors.orientation && errors.orientation.type === 'required' && (<span className="text-danger"> *</span>)}<br />

				<Controller
					class="form-control"
					name="orientation"
					as={Select}
					options={options}
					value={defVal()}
					defaultValue={defVal()}
					control={control}
					rules={{ required: true }}
					isMulti />
			</div>
}

export default SelectOrientation
