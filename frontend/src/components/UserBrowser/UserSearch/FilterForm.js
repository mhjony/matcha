import React from 'react'
import { Form, Col } from 'react-bootstrap'
import Select from 'react-select'
import Togglable from '../../UI/Togglable'

const FilterForm = ({ user, requiredTags, handleTagsChange, maxDistance, minFame, minAge, maxAge }) => (
	<Togglable showText='show filters' hideText='hide filters'>
		<Form className='mb-3'>
			{user.tags
				? <Form.Group>
					<Form.Label htmlFor='tags-field'>Tags</Form.Label>
					<Select
						isMulti
						id='tags-field'
						defaultValue={requiredTags.value}
						value={requiredTags.value}
						name='tags'
						onChange={handleTagsChange}
						options={user.tags
							.split('#')
							.map(t => t === '' ? ({ value: '', label: '' }) : ({ value: t, label: t }))} />
				</Form.Group>
				: null
			}

			<Form.Row>
				<Col>
					<Form.Group>
						<Form.Label htmlFor='max-distance-field'>Max distance</Form.Label>
						<Form.Control id='max-distance-field' {...maxDistance} />
					</Form.Group>
				</Col>
				<Col>
					<Form.Group>
						<Form.Label htmlFor='min-fame-field'>Min fame</Form.Label>
						<Form.Control id='min-fame-field' {...minFame} />
					</Form.Group>
				</Col>
			</Form.Row>

			<Form.Row>
				<Col>
					<Form.Group>
						<Form.Label htmlFor='min-age-field'>Min age</Form.Label>
						<Form.Control id='min-age-field' {...minAge} />
					</Form.Group>
				</Col>
				<Col>
					<Form.Group>
						<Form.Label htmlFor='max-age-field'>Max age</Form.Label>
						<Form.Control id='max-age-field' {...maxAge} />
					</Form.Group>
				</Col>
			</Form.Row>
		</Form >
	</Togglable >
)

export default FilterForm