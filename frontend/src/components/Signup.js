import React, { Fragment, useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [errors, setErrors] = useState("");
  const verified = 0;
  const token = "thisistoken93i493hele"
  const recieveEmail = 0

  const validate = () => {
	  let name = this.state.name;
	  let username = this.state.username;
	  let email = this.state.email;
	  let password = this.state.password;
	  let cpassword = this.state.cpassword;

	  let isValid = true;
	  let errors = {};

	  if (!name){
		isValid = false;
		errors["name"] = "Please write your full name";
	  }
	  if (!username){
		  isValid = false;
		  errors["username"] = "Write your username";
	  }
	  if (!email){
		  isValid = false;
		  errors["email"] = "Write your email";
	  }
	  if (typeof email !== "undefined") {
          
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(email)) {
          isValid = false;
          errors["email"] = "Please enter valid email address.";
        }
      }
	  if (!password || !cpassword){
		  isValid = false;
		  errors["password"] = "Type your desired password properly";
	  }
	  setErrors(errors);
	  return (isValid);
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
					name="fullname"
					value = {name}
					onChange={e => setName(e.target.value)}
					placeholder="Full Name"
				/>
				<div className="text-danger">{errors}</div>
			</div>
                <input className="form-control mt-3" type="text" name="username" value = { username } onChange={e => setUsername(e.target.value)} placeholder="Username" required />
                <input className="form-control mt-3" type="text" name="email" value = { email } onChange={e => setEmail(e.target.value)} placeholder="john@gmail.com" required/>
                <input className="form-control mt-3" type="password" name="passwd" value = { password } onChange={e => setPassword(e.target.value)} placeholder="Type password" required />
                <input className="form-control mt-3" type="password" name="cpasswd" value = { cpassword } onChange={e => setCpassword(e.target.value)} placeholder="Confirm password" required />
                <button className="btn btn-success mt-3">Register</button>
            </form>
        </div>
    </Fragment>
  );
};

export default Signup;