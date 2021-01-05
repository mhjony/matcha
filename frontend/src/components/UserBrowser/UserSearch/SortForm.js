import React, { useCallback, useEffect } from 'react'
import userService from '../../../services/userService'
import { Form } from 'react-bootstrap'

const SortForm = ({ user, resultsToShow, setResultsToShow }) => {

	const sortResults = useCallback((res, by) => {

		const countMutualTags = tags => {
			const userTags = user.tags.split('#')

			return tags.split('#').reduce((m, t) => userTags.includes(t)
				? m + 1
				: m, -1)
		}

		const sortByTags = () => res
			.map(r => r.mutualTags
				? r
				: ({
					...r,
					mutualTags: countMutualTags(r.tags)
				}))
			.sort((a, b) => b.mutualTags - a.mutualTags)

		if (!res || res.length === 0)
			return

		let sortedResults = [...res]

		switch (by) {
		case 'age descending':
			sortedResults.sort((a, b) => b.age.years - a.age.years)
			break
		case 'age ascending':
			sortedResults.sort((a, b) => a.age.years - b.age.years)
			break
		case 'fame':
			sortedResults.sort((a, b) => b.fame - a.fame)
			break
		case 'tags':
			sortedResults = sortByTags()
			break
		case 'distance':
			sortedResults.sort((a, b) => a.distance - b.distance)
			break
		default:
			break
		}

		return sortedResults
	}, [user.tags])

	const handleSort = e => {
		window.localStorage.setItem('matchaSortBy', e.target.value)
		setResultsToShow(sortResults(resultsToShow, e.target.value))
	}


	useEffect(() => {
		userService
			.getByGenderOrientation(user.orientation, user.gender)
			.then(res => {

				const calculateDistance = (lat1, lon1, lat2, lon2) => {

					const R = 6371e3 // metres
					const φ1 = lat1 * Math.PI / 180 // φ, λ in radians
					const φ2 = lat2 * Math.PI / 180
					const Δφ = (lat2 - lat1) * Math.PI / 180
					const Δλ = (lon2 - lon1) * Math.PI / 180

					const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
						Math.cos(φ1) * Math.cos(φ2) *
						Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
					const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

					return R * c / 1000 //in kilometres
				}

				const filteredResults = res
					.map(u => ({
						...u,
						distance: calculateDistance(user.latitude, user.longitude, u.latitude, u.longitude)
					}))
					.filter(u => u.user_id !== user.user_id)


				const defaultSortValue = window.localStorage.getItem('matchaSortBy')
					? window.localStorage.getItem('matchaSortBy')
					: 'fame'

				setResultsToShow(sortResults(filteredResults, defaultSortValue))
			})
			.catch(e => {
				console.log('Database error', e)
			})
	}, [user.latitude, user.longitude, user.gender, user.orientation, user.user_id, setResultsToShow, sortResults])

	return <Form>
		<Form.Group>
			<Form.Label htmlFor='sort-users-field'>Sort by</Form.Label>
			<Form.Control id='sort-users-field' as="select" defaultValue={window.localStorage.getItem('matchaSortBy')
				? window.localStorage.getItem('matchaSortBy')
				: 'fame'} onChange={handleSort}>
				<option value="fame">fame</option>
				<option value="tags">mutual tags</option>
				<option value="age ascending">age (from youngest to oldest)</option>
				<option value="age descending">age (from oldest to youngest)</option>
				<option value="distance">distance</option>

			</Form.Control>
		</Form.Group>
	</Form>
}

export default SortForm