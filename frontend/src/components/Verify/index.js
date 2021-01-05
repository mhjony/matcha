import React from 'react'
import Login from '../Login'

const Verify = ({ setUser, wsClient }) => {

	return <>
		<p className="text-center text-success">account verified</p>
		<Login setUser={setUser} wsClient={wsClient} />
	</>
}

export default Verify