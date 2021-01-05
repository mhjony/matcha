import React, { useRef } from 'react'
import { Form } from 'react-bootstrap'

const PasswordFields = ({ watch, register, required, errors }) => {
	const password = useRef({})
	password.current = watch('password', '')

	return <>
		<Form.Group className="text-left">
			<Form.Label>password</Form.Label>
			{errors.password && errors.password.message === '*'
				&& (<span className="text-danger"> {errors.password.message}</span>)}<br />

			<input className="form-control" name="password" type="password"
				defaultValue="" maxLength="50" placeholder="password"
				ref={register({
					required: {
						value: required,
						message: '*'
					},
					maxLength: {
						value: 50,
						message: 'max length 50'
					},
					minLength: {
						value: 8,
						message: 'min length 8'
					},
					pattern: {
						value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
						message: 'must contain a number, an upper and a lower case letter'
					}
				})} />
			{errors.password && errors.password.message !== '*'
				? <p className="text-danger">{errors.password.message}</p>
				: <p></p>
			}
		</Form.Group>
		<Form.Group className="text-left">
			<input className="form-control" name="password2" type="password"
				defaultValue="" maxLength="50" placeholder="confirm password"
				ref={register({ validate: value => value === password.current || 'passwords don\'t match' })} />
			{errors.password2 && (<p className="text-danger">{errors.password2.message}</p>)}
		</Form.Group>
	</>
}

export default PasswordFields