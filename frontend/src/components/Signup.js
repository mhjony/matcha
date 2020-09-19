import React, { Fragment, useState, useEffect, useRef } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  //const [errors, setErrors] = useState("");
  const verified = 0;
  const token = "thisistoken93i493hele"
  const recieveEmail = 0

  //new lines
  const firstRender = useRef(true);
  const [disable, setDisabled] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
	  if (firstRender.current){
		  firstRender.current = false
		  return
	  }
	  setDisabled(formValidation())
  }, [name]) // eslint-disable-line react-hooks/exhaustive-deps

  const formValidation = () => {
	if (name === "") {
		setError('Name cant be blank!')
		return true
	} else {
		setError(null)
		return false
	}
  }

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
		body: JSON.stringify({name, username, email, verified, token, password, recieveEmail})
      });
	console.log(response);
    window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h2 className="text-center mt-3">Signup Form</h2>
        <div className="row justify-content-center align-items-center">
            <form className="text-center mt-3 col-md-6 col-sm-6 col-lg-4 col-xs-8" onSubmit={onSubmitForm}>
			<div className="form-group">
				<input className="form-control mt-3" 
					type="text"
					name="name"
					value = {name}
					onChange={e => setName(e.target.value)}
					placeholder="Full Name"
				/>
				{ error && <p>{error}</p> }
			</div>
                <input className="form-control mt-3" type="text" name="username" value = { username } onChange={e => setUsername(e.target.value)} placeholder="Username" required />
                <input className="form-control mt-3" type="text" name="email" value = { email } onChange={e => setEmail(e.target.value)} placeholder="john@gmail.com" required/>
                <input className="form-control mt-3" type="password" name="passwd" value = { password } onChange={e => setPassword(e.target.value)} placeholder="Type password" required />
                <input className="form-control mt-3" type="password" name="cpasswd" value = { cpassword } onChange={e => setCpassword(e.target.value)} placeholder="Confirm password" required />
                <button className="btn btn-success mt-3" type="submit" disabled={disable}>Register</button>
            </form>
        </div>
    </Fragment>
  );
};

export default Signup;