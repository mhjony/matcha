import { useState } from 'react'

export const useField = (type, current) => {
	const [ value, setValue ] = useState(current)
	const onChange = event => setValue(event.target.value)
	//console.log('useField:', current)
	const reset = () => setValue(current)

	return {
		type,
		value,
		onChange,
		reset
	}
}