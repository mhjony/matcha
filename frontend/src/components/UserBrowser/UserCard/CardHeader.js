import React from 'react'
import { Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAward } from '@fortawesome/free-solid-svg-icons'

const CardHeader = ({ hideUser, fame }) => <Card.Body className="d-flex justify-content-between">
	<span className="text-primary cursor-pointer" onClick={hideUser}>
		Back to the list
	</span>
	<span>
		<FontAwesomeIcon icon={faAward} /> {fame}<br/>
	</span>
</Card.Body>

export default CardHeader