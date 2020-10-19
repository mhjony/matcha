import React from 'react'

const InputField = ({ label, field, current }) => (
	<div className="form-group">
		<label>{label}</label><br />
		<input className="form-control" {...field} />
	</div>
)

export default InputField