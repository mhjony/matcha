import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const ConfirmationModal = ({ modal: m, setModal }) => {

	return m &&
		<Modal show={m !== null} variant="success" onHide={() => setModal(null)} centered>
			<Modal.Header closeButton>
				<Modal.Title>{m.text}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{m.text} {m.username}?
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={() => setModal(null)}>Cancel</Button>
				<Button onClick={m.action}>{m.text}</Button>
			</Modal.Footer>
		</Modal>
}
export default ConfirmationModal