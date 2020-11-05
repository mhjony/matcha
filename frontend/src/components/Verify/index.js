import React from "react";
import Login from '../Login';

const Verify = ({ setUser }) => {

	return <>
			<p className="text-center text-success">account verified</p>
			<Login setUser={setUser} />
		</>
}

export default Verify