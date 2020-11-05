import React, { useRef } from 'react'

const PasswordFields = ({ watch, register, errors }) => {
	const password = useRef({})
	password.current = watch("password", "")

	return 	<div className="form-group">
				<label>change password</label><br />
				<input className="form-control" name="password" type="password"
					defaultValue="" maxLength="50" placeholder="new password"
					ref={register({
						maxLength: {
							value: 50,
							message: "max length 50"
						},
						minLength: {
							value: 8,
							message: "min length 8"
						},
						pattern: {
							value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
							message: "must contain a number, an upper and a lower case letter"
						}
					})} />
				{errors.password
					? <p className="text-danger">{errors.password.message}</p>
					: <p></p>
				}

				<input className="form-control" name="password2" type="password"
					defaultValue="" maxLength="50" placeholder="confirm password"
					ref={register({ validate: value => value === password.current || "passwords don't match" })} />
				{errors.password2 && (<p className="text-danger">{errors.password2.message}</p>)}
			</div>
}

export default PasswordFields