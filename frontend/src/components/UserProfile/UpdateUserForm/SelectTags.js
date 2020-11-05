import React, { useState, useEffect } from 'react'
import CreatableSelect from 'react-select'
import { Controller } from 'react-hook-form'
import tagService from '../../../services/tagService'

const SelectTags = ({ userTags, control }) => {

	const [ inputValue, setInputValue ] = useState('')
	const [ tags, setTags ] = useState(false)

	useEffect(() => {
		tagService
			.getTags()
			.then(data => {
				setTags(data)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])

	const addNewTag = () => {

		const newTag = inputValue.startsWith('#')
			? inputValue
			: '#' + inputValue

		tagService
			.addTag({ tag: newTag })
			.then(res => {
				setTags(tags.concat({ tag: res }))
				setInputValue('')
			})
			.catch((e) => {
				console.log('Failed to add tag', e.response.data)
			})
	}

	const handleInputChange = value => setInputValue(value)

	const handleKeyDown = event => {

		//todo: enter to pick the tag if it already exists
		// and should it close after enter
		if (!inputValue) return
		switch (event.key) {
			case 'Enter':
			case 'Tab':
				event.preventDefault()
				addNewTag()
				break
			default:
				return
		}
	}

	const getOptions = () => tags.map(t => {
		return { value: t.tag, label: t.tag }
	})

	const userTagsFromDb = () => {
		if (!userTags)
			return []

		const tagsFromUser = userTags.split('#').map(t => {
			return { value: '#' + t, label: '#' + t }
		})
		return tagsFromUser.slice(1)
	}


	//console.log('user tags:', userTags)
	//console.log('tags:', tags)

	return tags
		? <div className="form-group">
			<label>tags</label><br />
			<Controller
				class="form-control"
				name="tags"
				as={CreatableSelect}
				options={getOptions()}
				value={userTagsFromDb()}
				defaultValue={userTagsFromDb()}
				onKeyDown={handleKeyDown}
				onInputChange={handleInputChange}
				inputValue={inputValue}
				control={control}
				isMulti
				isClearable />
		</div>
		: null
}

export default SelectTags