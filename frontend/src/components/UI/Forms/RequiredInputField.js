import React from 'react'
import { Form } from 'react-bootstrap'

const RequiredInputField = ({ label, errors, name, defVal, maxLen, requirements, register }) => (
	<Form.Group className="text-left">
		<Form.Label htmlFor={`form-${name}`}>{label}</Form.Label>
		{errors && (<span className="text-danger"> {errors.message}</span>)}<br />

		<Form.Control id={`form-${name}`} name={name} defaultValue={defVal} maxLength={maxLen}
			ref={register({
				...requirements,
				required: {
					value: true,
					message: '*'
				},
				maxLength: {
					value: maxLen,
					message: `max length ${maxLen}`
				}
			})} />
	</Form.Group>
)

export default RequiredInputField