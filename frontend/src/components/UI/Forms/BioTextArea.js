import React from 'react'
import { Form } from 'react-bootstrap'

const BioTextArea = ({ bio, register, errors }) => (
	<Form.Group>
		<Form.Label htmlFor='bio-textarea'>bio</Form.Label><br />
		<Form.Control as='textarea' id='bio-textarea' name='bio' defaultValue={bio} maxLength='1000'
			ref={register({
				maxLength: {
					value: 1000,
					message: 'max length 1000'
				}
			})} />
		{errors && (<p className='text-danger'>{errors.message}</p>)}
	</Form.Group>
)

export default BioTextArea