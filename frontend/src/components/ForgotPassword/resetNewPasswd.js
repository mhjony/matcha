import React, { useState } from 'react'
import resetPassService from '../../services/forgotpassService'
import { useParams } from 'react-router-dom'

const ResetPassword = () => {
	const [password, setPassword] = useState('')
	const [cpassword, setCpassword] = useState('')
	const [status,setStatus] = useState('')
	const [errmsg, setErrmsg] = useState('')
	let { token } = useParams()

	const inputValidation = () => {
		if (password === '' || cpassword === '')
			return false
		else
			return true
	}

	const resetForm = (e) => {
		e.preventDefault()

		if (!inputValidation())
		{
			setErrmsg('All fields must be filled up')
			return
		}
		if (password === cpassword)
		{
			//axios data here
			resetPassService
				.resetPass({ password, token })
				.then(function (response){
					setStatus(response.message)
					setPassword('')
					setCpassword('')
					setErrmsg('')
				})
				.catch(function (error){
					setErrmsg(error.response.data.error)
					setStatus('')
				})
		}
		else
		{
			setErrmsg('Password mismatch')
			return
		}
	}

	return <>
		<h2 className="text-center mt-3">Reset your password</h2>
		<div className="row justify-content-center align-items-center">
			<form className="text-center mt-3 col-md-6 col-sm-6 col-lg-4 col-xs-8" onSubmit={resetForm}>
				{status && <div className="text-success" ><strong>{status}</strong></div>}
				{errmsg && <div className="text-danger" ><strong>{errmsg}</strong></div>}
				<div className="form-group mt-3">
					<input className="form-control"
						type="password"
						name="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
						placeholder="Type a new password"
					/>
				</div>
				<div className="form-group mt-3">
					<input className="form-control"
						type="password"
						name="cpassword"
						value={cpassword}
						onChange={e => setCpassword(e.target.value)}
						placeholder="Confirm new password"
					/>
				</div>
				<button className="btn btn-success mt-3" type="submit">Submit</button>
			</form>
		</div>
	</>
}

export default ResetPassword