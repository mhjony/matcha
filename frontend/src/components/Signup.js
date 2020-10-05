import React, { Fragment, useState, useRef, useEffect } from "react";
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

const Signup = () => {
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [cpassword, setCpassword] = useState("");
	const [gender, setGender] = useState('');
	const [date, setDate] = useState(new Date());
	const verified = 0;
	const recieveEmail = "0"

	const firstRender = useRef(true);
	const [disable, setDisable] = useState(true);
	const [error, setError] = useState("");
	const [loginStatus, setLoginStatus] = useState("");
	const today = new Date();

	// generating token
	const rand = () =>Math.random(0).toString(36).substr(2);
	const token_check = (length) =>(rand()+rand()+rand()+rand()).substr(0,length);
	const token = token_check(40);

	useEffect(() => {
		if (firstRender.current){
			firstRender.current = false;
			return
		}
		setDisable(inputValidation());
	}, [name, username, email, password]) // eslint-disable-line react-hooks/exhaustive-deps

	const inputValidation = () => {
		if (name === "" || username === "" || email === "" || password === "")
		{
			if (name === ""){
				setError("Name field cant be empty")
				return true
			}
			if (username === ""){
				setError("Username field cant be empty")
				return true
			}
			if (email === ""){
				setError("Email field cant be empty")
				return true
			}
			if (password === ""){
				setError("Password field cant be empty")
				return true
			}
			if (gender === "select"){
				setError("Select your gender")
				return true
			}
		}
		else {
			setError(null);
			return false;
		}
	}

	const submitForm = async e => {
		e.preventDefault();
		//console.log(gender);
		if (!inputValidation())
		{
			try {
				const response = await fetch("http://localhost:5000/signup", {
					method: "POST",
					headers: {"content-type": "application/json"},
					body: JSON.stringify({name, username, email, password, verified, token, recieveEmail, gender})
				})
				console.log(response);
				//window.location = "/";
			}catch(err){
				console.error(err.message);
			}
		}
		else{
			alert({error})
		}
	}
	return (
		<Fragment>
			<h2 className="text-center mt-3">Signup Form</h2>
			<div className="row justify-content-center align-items-center">
				<form className="text-center mt-3 col-md-6 col-sm-6 col-lg-4 col-xs-8" onSubmit={submitForm}>
					<div className="form-group">
						<input className="form-control"
							type="text" 
							name="name"
							value={name}
							onChange={e => setName(e.target.value)} 
							placeholder="Full Name" 
						/>
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
					<div className="form-group mt-3">
						<select className="form-control btn border" name="gender" value={gender} onChange={e => setGender(e.target.value)}>
							<option value="select">select</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
							<option value="others">Others</option>
						</select>
					</div>
					<div className="form-group mt-3">
						<DatePicker className="form-control"
							selected={date}
							onChange={date => setDate(date)}
							name="date"
							maxDate={today}
							dateFormat="dd/MM/yyyy"
						/>
					</div>
					
					<button className="btn btn-success mt-3" disabled={disable} type="submit">Register</button>
				</form>
			</div>
		</Fragment>
	)
}

export default Signup;