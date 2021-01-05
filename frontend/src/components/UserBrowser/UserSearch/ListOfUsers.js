import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAward } from '@fortawesome/free-solid-svg-icons'
import { ListGroup } from 'react-bootstrap'

const ListOfUsers = ({ users, handleClick }) => {

	return (
		users && users.length > 0
			? <ListGroup className="text-left mt-3" variant="flush">
				{users.map(u =>
					<ListGroup.Item action
						key={u.user_id}
						style={{ cursor: 'pointer' }}
						onClick={() => handleClick(u)} >

						<div style={{ display: 'inline-block', width: '60%' }}>
							{u.username}, {u.age.years}
						</div>
						<div style={{ display: 'inline-block', width: '40%', textAlign: 'right' }}>
							{parseInt(u.distance)} km<br />
							<FontAwesomeIcon icon={faAward} /> {u.fame}
						</div>
					</ListGroup.Item>)}
			</ListGroup>
			: <div className="text-info mt-3">
				Could not find any matching users<br />
				please try different filters
			</div>
	)
}
export default ListOfUsers