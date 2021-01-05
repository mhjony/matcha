import React, { useState } from 'react'
import { useFilter } from '../../../hooks/index'
import { useHistory } from 'react-router-dom'
import ListOfUsers from './ListOfUsers'
import SortForm from './SortForm'
import FilterForm from './FilterForm'

const UserSearch = ({ user }) => {

	const [resultsToShow, setResultsToShow] = useState([])
	const [requiredTags, setRequiredTags] = useState(localStorage.getItem('matchaRequiredTags') || [])
	const handleTagsChange = e => setRequiredTags(e ? e.map(t => t.value) : [])

	const maxDistance = useFilter('matchaMaxDistance', 100, 'number')
	const minAge = useFilter('matchaMinAge', 20, 'number')
	const maxAge = useFilter('matchaMaxAge', 120, 'number')
	const minFame = useFilter('matchaMinFame', 50, 'number')

	const history = useHistory()
	const sortFormProps = ({ user, resultsToShow, setResultsToShow })
	const filterFormProps = ({ user, requiredTags, handleTagsChange, maxDistance, minFame, minAge, maxAge })

	const requiredTagFound = tags => tags && requiredTags.length > 0
		? requiredTags.every(t => tags.split('#').includes(t))
		: true

	const matchesFilters = r =>
		r.distance <= maxDistance.value &&
		r.age.years >= minAge.value &&
		r.age.years <= maxAge.value &&
		r.fame >= minFame.value &&
		requiredTagFound(r.tags)

	const filterResults = () => resultsToShow

		? resultsToShow
			.filter(r => matchesFilters(r))
		: []

	const handleClick = user => {
		history.push(`/browse?user_id=${user.user_id}`)
	}


	return <>
		<SortForm {...sortFormProps} />

		<FilterForm {...filterFormProps} />

		<ListOfUsers users={filterResults()} handleClick={handleClick} />
	</>

}

export default UserSearch