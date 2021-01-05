import React from 'react'
import { ListGroup } from 'react-bootstrap'
import Chat from './Chat'

const Matches = ({ user, matches, chatToShow, setChatToShow, wsClient }) => {

	return matches && matches.length !== 0
		? <>
			<ListGroup className="text-left text-primary" variant="flush">
				{matches.map(m =>
					<ListGroup.Item action key={m.username} className="p-3 cursor-pointer"
						onClick={() => setChatToShow(m)}>
						{m.username}
					</ListGroup.Item>)
				}
			</ListGroup>

			<Chat user={user} match={chatToShow} wsClient={wsClient}
				handleClose={() => setChatToShow(null)} />
		</>
		: <div>Get some matches to chat</div>

}

export default Matches