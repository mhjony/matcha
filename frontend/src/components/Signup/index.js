import React, { Fragment, useState, useRef, useEffect } from "react";
//import FlashMessage from 'react-flash-message';
//import Alert from 'react-bootstrap/Alert';
import '../../style/signup.css';
import userService from '../../services/userService'

const Signup = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [cpassword, setCpassword] = useState("");
	const [disable, setDisable] = useState(true);
	const [error, setError] = useState("");
	const [signupStatus, setSignupStatus] = useState("");
	
	const firstRender = useRef(true);

	// generating token
	const rand = () => Math.random(0).toString(36).substr(2);
	const token_check = (length) =>(rand()+rand()+rand()+rand()).substr(0,length);
	const token = token_check(100);

	useEffect(() => {
		if (firstRender.current){
			firstRender.current = false;
			return
		}
		setDisable(!inputValidation());
	}, [firstName, lastName, username, email, password]) // eslint-disable-line react-hooks/exhaustive-deps

	const inputValidation = () => {
		if (lastName === "" || firstName === "" || username === "" || email === "" || password === "")
		{
			setError("All fields should be filled!")
			return false;
		}
		else
			return true;
	}

	const submitForm = async e => {
		e.preventDefault();

		if (!inputValidation()) {
			alert({error})
			return
		}

		if (password === cpassword)
		{
			const userObject = {
				firstName,
				lastName,
				username,
				email,
				password,
				token
			}

			userService
				.createUser(userObject)
				.then(data => {
					console.log('user added', data)
				})
				.catch(e => {
					setSignupStatus(e.response.data.error)
				})
		}
		else
			return setSignupStatus("Password and cofirm password mismatch")
			
	}
	return (
		<Fragment>
			{ signupStatus && 
				<div><strong>{signupStatus}</strong></div>
				/*<FlashMessage duration={5000}>
					<Alert variant="info">
						<span className="close"><strong >X</strong></span>
						<strong>{signupStatus}</strong>
					</Alert>
				</FlashMessage>*/
			}
			<h2 className="text-center mt-3">Signup Form</h2>
			<div className="row justify-content-center align-items-center">
				<form className="text-center mt-3 col-md-6 col-sm-6 col-lg-4 col-xs-8" onSubmit={submitForm}>
					<div className="form-group form-horizontal">
						<div className="form-group" id="firstName">
							<input className="form-control"
								type="text" 
								name="firstName"
								value={firstName}
								onChange={e => setFirstName(e.target.value)} 
								placeholder="First Name" 
							/>
						</div>
						<div className="form-group" id="lastName">
							<input className="form-control"
								type="text" 
								name="lastName"
								value={lastName}
								onChange={e => setLastName(e.target.value)} 
								placeholder="Last Name" 
							/>
						</div>
					</div>
					<div className="form-group mt-3">
						<input className="form-control"
							type="text"
							name="username" 
							value={username}
							onChange={e => setUsername(e.target.value)}
							placeholder="Username" 
						/>
					</div>
					<div className="form-group mt-3">
						<input className="form-control"
							type="text" 
							name="email"
							value={email}
							onChange={e => setEmail(e.target.value)}
							placeholder="Email"
						/>
					</div>
					<div className="form-group mt-3">
						<input className="form-control"
							type="password"
							name="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
							placeholder="Password"
						/>
					</div>
					<div className="form-group mt-3">
						<input className="form-control"
							type="password"
							name="cpassword"
							value={cpassword}
							onChange={e => setCpassword(e.target.value)}
							placeholder="Confirm password"
						/>
					</div>					
					<button className="btn btn-success mt-3" disabled={disable} type="submit">Register</button>
				</form>
			</div>
		</Fragment>
	)
}

export default Signup;