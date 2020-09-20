import React, { Fragment, useState, useRef, useEffect } from "react";

const Signup = () => {
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [cpassword, setCpassword] = useState("");
	const verified = 0;
	const token = "newtoken08989today"
	const recieveEmail = 0

	const firstRender = useRef(true);
	const [disable, setDisable] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		if (firstRender.current){
			firstRender.current = false;
			return
		}
		setDisable(inputValidation());
	}, [name]) // eslint-disable-line react-hooks/exhaustive-deps

	const inputValidation = () => {
		if (name === ""){
			setError("Name field cant be empty")
			return true
		}else {
			setError(null);
			return false;
		}
	}

	const submitForm = async e => {
		e.preventDefault();
		try {
			const response = await fetch("http://localhost:5000/signup", {
				method: "POST",
				headers: {"content-type": "application/json"},
				body: JSON.stringify({name, username, email, password, verified, token, recieveEmail})
			})
			console.log(response);
			window.location = "/";
		}catch(err){
			console.error(err.message);
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
						{error}
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