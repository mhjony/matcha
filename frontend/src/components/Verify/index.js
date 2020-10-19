import React from "react";
import Login from '../Login';

const Verify = ({ setUser }) => {

	return <>
			<h3 className="text-center mt-3">Account verified</h3>
			<Login setUser={setUser} />
		</>
}

export default Verify