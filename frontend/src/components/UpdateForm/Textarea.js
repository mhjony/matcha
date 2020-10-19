import React from 'react'

const Textarea = ({ value, setValue, label, name }) => (
	<div className="form-group">
		<label>{label}</label><br />
		<textarea className="form-control" name={name} value={value} onChange={ e => setValue(e.target.value) } maxLength="1000" />
	</div>
)
export default Textarea