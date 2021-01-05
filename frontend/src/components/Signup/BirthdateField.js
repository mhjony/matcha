import React, { useRef } from 'react'
import { Form, Col } from 'react-bootstrap'

const BirthdateField = ({ errors, register, watch }) => {

	const day = useRef(null)
	const month = useRef(null)

	day.current = watch('birthdate.day', '')
	month.current = watch('birthdate.month', '')

	const valueMissing = () => (errors.day && errors.day.type === 'required') ||
	(errors.month && errors.month.type === 'required') || (errors.year && errors.year.type === 'required')

	const isValidDate = year => {
		const date = new Date(year, (+month.current-1), day.current)
		return +date && date.getDate() === +day.current
	}

	return <div className="text-left">

		<Form.Label >birthdate</Form.Label>
		<span className="text-danger"> { errors && valueMissing() && '*'}</span>
		<span className="text-danger"> { errors && !valueMissing() && 'not a valid date'}</span><br />

		<Form.Row>
			<Col xs={3}>
				<Form.Group>
					<Form.Label>day</Form.Label>
					<Form.Control name='birthdate.day' placeholder='dd' defaultValue='' maxLength='2'
						ref={register({
							required: true,
							maxLength: 2
						})} />
				</Form.Group>
			</Col>
			<Col xs={3}>
				<Form.Group>
					<Form.Label>month</Form.Label>
					<Form.Control name='birthdate.month' placeholder='mm' defaultValue='' maxLength='2'
						ref={register({
							required: true,
							maxLength: 2
						})} />
				</Form.Group>
			</Col>
			<Col xs={6}>
				<Form.Group>
					<Form.Label>year</Form.Label>
					<Form.Control name='birthdate.year' placeholder='yyyy' defaultValue='' maxLength='4'
						ref={register({
							required: true,
							maxLength: 4,
							validate: value => isValidDate(value)
						})} />
				</Form.Group>
			</Col>
		</Form.Row>
	</div>
}

export default BirthdateField