const orientationToDb = selected => {

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

const userTagsFromDb = tags => tags
	? tags.split('#').map(t => ({ label: `#${t}`, value: `#${t}` })).slice(1)
	: []

export default { orientationToDb, userTagsFromDb }