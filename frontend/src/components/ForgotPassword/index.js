import React, { useState } from 'react'
import forgotPasswdService from '../../services/forgotpassService'

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
	const [message, setMessage] = useState(null)
	const [errMessage, setErrmessage] = useState(null)

    const forgotHandler = e => {
		e.preventDefault();
		forgotPasswdService
		.forgotPass({email})
		.then(function (response){
			setMessage(response.message)
			setErrmessage('')
			setEmail('')
		})
		.catch(function (error){
			setErrmessage(error.response.data.error)
			setMessage('')
		})
    }
    return <>
            <h2 className="text-center mt-3">Forgot password</h2>
			<div className="row justify-content-center align-items-center">
				<form className="text-center mt-3 col-md-6 col-sm-6 col-lg-4 col-xs-8" onSubmit={forgotHandler}>
					{errMessage && <div className="text-danger" ><strong>{errMessage}</strong></div>}
					{message && <div className="text-success" ><strong>{message}</strong></div>}
					<div className="form-group mt-3">
						<input className="form-control"
							type="text"
							name="email"
							value={email}
							onChange={({ target }) => setEmail(target.value)}
							placeholder="Type your email"
						/>
					</div>
					<button className="btn btn-success mt-3" type="submit">Submit</button>
				</form>
			</div>
        </>
}

export default ForgotPassword;