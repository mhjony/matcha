import React from 'react'
import Select from 'react-select'

const SelectOrientation = ({ setOrientation, orientation }) => {

	const orientationFromDb = () => {
		const o = []
		if (orientation.includes('f'))
			o.push({ value: 'female', label: 'female' })
		if (orientation.includes('m'))
			o.push({ value: 'male', label: 'male' })
		if (orientation.includes('o'))
			o.push({ value: 'other', label: 'other' })
		return o
	}

	const orientationToDb = selected => {

		console.log('selected', selected)
		//todo: disable update if not selected
		if (!selected)
			return ''
		if (selected.length === 3)
			return 'fmo'
		if (selected.length === 1)
			return selected[0].value.substring(0, 1)
		if (!selected.map(o => o.value).find(v => v === 'female'))
			return 'mo'
		if (!selected.map(o => o.value).find(v => v === 'male'))
			return 'fo'
		return 'fm'
	}

	const onChange = selected => {
		console.log('on orientation change', orientationToDb(selected))
		return setOrientation(orientationToDb(selected))
	}

	const options = [
		{ value: 'female', label: 'female' },
		{ value: 'male', label: 'male' },
		{ value: 'other', label: 'other' }
	]

	return 	<div className="form-group">
				<label>looking for</label><br />
				<Select class="form-control" options={options} value={orientationFromDb()} onChange={onChange} isMulti />
			</div>
}

export default SelectOrientation
