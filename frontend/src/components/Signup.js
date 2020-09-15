import React, { Fragment, useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const verified = 0;
  const token = "thisistoken93i493hele"
  const recieveEmail = 0

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
                <input className="form-control mt-3" type="text" value = {name} onChange={e => setName(e.target.value)} placeholder="Full Name" />
                <input className="form-control mt-3" type="text" value = { username } onChange={e => setUsername(e.target.value)} placeholder="Username"/>
                <input className="form-control mt-3" type="text" value = { email } onChange={e => setEmail(e.target.value)} placeholder="john@gmail.com"/>
                <input className="form-control mt-3" type="password" value = { password } onChange={e => setPassword(e.target.value)} placeholder="Type password"/>
                <input className="form-control mt-3" type="password" value = { cpassword } onChange={e => setCpassword(e.target.value)} placeholder="Confirm password"/>
                <button className="btn btn-success mt-3">Register</button>
            </form>
        </div>
    </Fragment>
  );
};

export default Signup;