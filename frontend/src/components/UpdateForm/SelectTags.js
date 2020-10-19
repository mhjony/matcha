import React, { useState } from 'react'
import CreatableSelect from 'react-select'
import tagService from '../../services/tagService'

const SelectTags = ({ setUserTags, userTags, tags, setTags }) => {

	const [inputValue, setInputValue] = useState('')

	const addNewTag = () => {

		const newTag = inputValue.startsWith('#')
			? inputValue
			: '#' + inputValue

		tagService
			.addTag({ tag: newTag })
			.then(res => {
				setUserTags(userTags.concat(res))
				setTags(tags.concat({ tag: res }))
				setInputValue('')
			})
			.catch((e) => {
				console.log('Failed to add tag', e.response.data)
			})
	}

	const handleChange = options => {
		options
			? setUserTags(options.map(t => t.value).join(''))
			: setUserTags('')
	}

	const handleInputChange = value => setInputValue(value)

	const handleKeyDown = event => {

		//todo: can enter pick the tag if it already exists
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
			<CreatableSelect
				class="form-control"
				options={getOptions()}
				value={userTagsFromDb()}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				onInputChange={handleInputChange}
				inputValue={inputValue}
				isMulti
				isClearable />
		</div>
		: null
}

export default SelectTags