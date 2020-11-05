import React from 'react'

const RequiredInputField = ({ label, errors, name, defVal, maxLen, requirements }) => (
	<div className="form-group text-left"
	>
		<label>{label}</label>
		{errors && (<span className="text-danger"> {errors.message}</span>)}<br />

		<input className="form-control" name={name} defaultValue={defVal} maxLength={maxLen}
			ref={requirements} />		
	</div>
)

export default RequiredInputField