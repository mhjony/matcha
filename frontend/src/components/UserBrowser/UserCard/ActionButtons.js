import React from 'react'
import { OverlayTrigger, Tooltip, Button, Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faFlag, faBan } from '@fortawesome/free-solid-svg-icons'

const DisabledLikeButton = () => <OverlayTrigger overlay={
	<Tooltip id="tooltip-disabled">You must have a profile picture to like users</Tooltip>}>
	<span>
		<Button variant="link" className="disabled">
			<FontAwesomeIcon icon={faHeart} /> Like
		</Button>
	</span>
</OverlayTrigger>

const LikeButton = ({ action, icon, text }) =>
	<Button variant="link" onClick={e => action(e)}>
		<FontAwesomeIcon icon={icon} /> {text}
	</Button>

const ActionButton = ({ action, icon, text, setConfirmationModal, username }) =>
	<Button variant="link" onClick={() => setConfirmationModal({ action, text, username })}>
		<FontAwesomeIcon icon={icon} /> {text}
	</Button>


const ActionButtons = ({ liked, hasPhoto, likeHandler, reportHandler, blockHandler, setConfirmationModal, username }) => {

	const actionButtonProps = {
		setConfirmationModal,
		username
	}

	return <Card.Body>
		{
			hasPhoto || liked
				? <LikeButton action={likeHandler} icon={faHeart} text={ liked ? ' Unlike' : ' Like' } />
				: <DisabledLikeButton likeHandler={likeHandler}  />
		}
		<ActionButton action={reportHandler} icon={faFlag} text=" Report" { ...actionButtonProps } />
		<ActionButton action={blockHandler} icon={faBan} text=" Block" { ...actionButtonProps } />
	</Card.Body>
}

export default ActionButtons