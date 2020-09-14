import React, { useState } from "react";

const Signup = () => {
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [cpassword, setCpassword] = useState("");

	const onSubmitForm = async e => {
		e.preventDefault();
		try{
			const name = { name };
			const username = { username };
			const email = { email };
			const password = { password };
			const cpassword = { cpassword };

			const response = await fetch()
		}catch(err){
			console.error(err.message);
		}
	}
  return (
    <>
		<h2 className="text-center mt-3">Signup Form</h2>
		<div className="row justify-content-center align-items-center">
			<form className="text-center mt-3 col-md-6 col-sm-6 col-lg-4 col-xs-8" onSubmit={onSubmitForm}>
				<input className="form-control mt-3" type="text" placeholder="Full Name" />
				<input className="form-control mt-3" type="text" placeholder="Username"/>
				<input className="form-control mt-3" type="text" placeholder="john@gmail.com"/>
				<input className="form-control mt-3" type="password" placeholder="Type password"/>
				<input className="form-control mt-3" type="password" placeholder="Confirm password"/>
				<button className="btn btn-success mt-3">Register</button>
			</form>
		</div>
	</>
  );
};

export default Signup;