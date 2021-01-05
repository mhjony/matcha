import { useState } from 'react'

export const useFilter = (name, defVal, type) => {

	const [value, setValue] = useState(window.localStorage.getItem(name)
		? window.localStorage.getItem(name)
		: defVal)

	const handleValue = val => {
		if (type === 'number') {
			val = parseInt(val)

			if (!val || val < 0)
				return
		}

		window.localStorage.setItem(name, val)
		setValue(val)
	}

	const onChange = e => handleValue(e.target.value)

	return { type, value, onChange }
}