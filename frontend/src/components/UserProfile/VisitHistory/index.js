import React, { useState, useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import viewService from '../../../services/viewsService'

const VisitHistory = ({ user, value }) => {
	const [viewhistory, setViewhistory] = useState([])

	useEffect(() => {
				
		viewService
			.viewsHistory({ username: user.username })
			.then(res => {
				setViewhistory(res)
			})
			.catch(e => {
				console.log('Database error', e)
			})

	}, [user.username])

	var i = 0
	return viewhistory && viewhistory.length > 0
		? <ListGroup className="text-left" variant="flush">
			{viewhistory.map(u => u.from_visit_username !== user.username && value === "viewstab" && u.status === 0 
			? <ListGroup.Item key={i++}>
				<div style={{ display: 'inline-block', width: '100%',  textAlign: 'center' }}>
					<Link to={`browse/?user_id=${u.from_user_id}`}>{u.from_visit_username}</Link> visited your profile
				</div>
			</ListGroup.Item>

			: u.from_visit_username !== user.username && value === "likestab" && u.status === 1 
			? <ListGroup.Item key={i++}>
				<div style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
					<Link to={`browse/?user_id=${u.from_user_id}`}>{u.from_visit_username}</Link> liked you
				</div>
			</ListGroup.Item>

			: u.from_visit_username === user.username && value === "fromprofile" 
			?<ListGroup.Item key={i++}>
				<div style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
					You visited <Link to={`browse/?user_id=${u.to_user_id}`}>{u.to_visit_username}</Link> profile
				</div>
			</ListGroup.Item>

			: null
			)}
		</ListGroup>
		: <div className="text-info">This tab is empty</div>
}

export default VisitHistory
