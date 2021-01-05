import React from 'react'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import TimeAgo from 'react-timeago'

const UserInformation = ({ user, isMatch }) => <>

	<Card.Body>
		<Card.Title>{user.username}</Card.Title>
		<Card.Text>{user.firstName} {user.lastName}, {user.age}</Card.Text>
		{ isMatch && <Card.Text><span className="p-1 border border-info rounded text-info">Match</span></Card.Text> }
		<Card.Text>
			{user.bio}
		</Card.Text>
	</Card.Body>

	<ListGroup className="list-group-flush">
		<ListGroupItem>{user.gender} looking for {user.orientation
			.map((o, i) => i === user.orientation.length - 1
				? o
				: i === user.orientation.length - 2
					? `${o} and `
					: `${o}, `
			)}
		</ListGroupItem>

		{ user.tags && <ListGroupItem>
			{user.tags.split('#')
				.map((t, i) => i > 1
					? ` #${t}`
					: i === 1 ? `#${t}` : null
				)}
		</ListGroupItem> }

		<ListGroupItem>
			{
				user.online
					? 'online'
					: <>last online <TimeAgo date={user.last_online} live={false} /></>
			}

		</ListGroupItem>
	</ListGroup>
</>

export default UserInformation