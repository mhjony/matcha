import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const MatchModal = ({ modal, setModal }) => modal &&
	<Modal show={modal !== null} variant="success" onHide={() => setModal(null)} centered>
		<Modal.Header closeButton>
			<Modal.Title>You got a match!</Modal.Title>
		</Modal.Header>
		<Modal.Body>
			<Link to='/matches'>You can now chat with {modal}</Link>
		</Modal.Body>
		<Modal.Footer>
			<Button onClick={() => setModal(null)}>Close</Button>
		</Modal.Footer>
	</Modal>

export default MatchModal