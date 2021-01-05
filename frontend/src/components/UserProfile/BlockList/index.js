import React, { useState, useEffect } from 'react'
import { ListGroup, Button } from 'react-bootstrap'
import blockService from '../../../services/blockService'

const BlockList = ({ user }) => {
	const [blockedUsers, setBlockedUsers] = useState([])

	useEffect(() => {
		blockService
			.getBlockedByUser(user.user_id)
			.then(res => {
				setBlockedUsers(res.filter(r => r.from_user_id === user.user_id))
			})
			.catch(e => {
				console.log('Database error', e)
			})
	}, [user.user_id])

	const unblockUser = block_id => {

		blockService
			.unblockUser(block_id)
			.then(() => {
				setBlockedUsers(blockedUsers.filter(u => u.block_id !== block_id))
			})
			.catch(e => {
				console.log('Database error', e)
			})
	}

	return blockedUsers && blockedUsers.length > 0
		? <ListGroup className="text-left" variant="flush">
			{blockedUsers.map(u =>
				<ListGroup.Item key={u.username}>
					<div style={{ display: 'inline-block', width: '60%' }}>{u.username}</div>
					<div style={{ display: 'inline-block', width: '40%', textAlign: 'right' }}>
						<Button onClick={() => unblockUser(u.block_id)} variant="outline-primary">Unblock</Button>
					</div>
				</ListGroup.Item>
			)}
		</ListGroup>

		: <div className="text-info">Your block list is empty</div>

}

export default BlockList