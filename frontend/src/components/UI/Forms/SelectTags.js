import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import CreatableSelect from 'react-select'
import tagService from '../../../services/tagService'

const SelectTags = ({ state, setState }) => {

	const [options, setOptions] = useState([])

	const handleChange = value => {
		setState({ value })
	}

	const handleInputChange = (inputValue) => {
		setState({ inputValue, value })
	}

	const createOption = label => ({ label, value: label })

	const handleKeyDown = (event) => {
		const { inputValue, value } = state

		if (!inputValue) return
		switch (event.key) {
		case 'Enter':
		case 'Tab':
			event.preventDefault()

			// eslint-disable-next-line no-case-declarations
			const newTag = inputValue.startsWith('#')
				? inputValue
				: '#' + inputValue

			if (value.find(o => o.label === newTag) !== undefined) {
				setState({
					inputValue: '',
					value
				})
				return
			}
			else if (options.find(o => o.label === newTag) !== undefined) {

				setState({
					inputValue: '',
					value: [...value, createOption(newTag)]
				})

				setOptions(options.filter(o => o.label !== newTag))
				return
			}

			tagService
				.addTag({ tag: newTag })
				.then(() => {

					setState({
						inputValue: '',
						value: [...value, createOption(newTag)]
					})

					setOptions(options.concat(createOption(newTag)))

				})
				.catch(e => {
					console.log('Database error', e)
				})
			break
		default:
			return
		}
	}

	useEffect(() => {
		tagService
			.getTags()
			.then(data => {
				setOptions(data.map(t => createOption(t.tag)))
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])

	const { value } = state

	return <Form.Group>
		<Form.Label htmlFor='tags-select'>tags</Form.Label>
		<CreatableSelect
			id='tags-select'
			inputValue={state.inputValue}
			isClearable
			isMulti
			onChange={handleChange}
			onInputChange={handleInputChange}
			onKeyDown={handleKeyDown}
			value={value}
			options={options}
			name='tags'
		/>
	</Form.Group>
}

export default SelectTags