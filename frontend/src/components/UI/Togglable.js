import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

const Togglable = (props) => {
	const [visible, setVisible] = useState(false)

	const showWhenVisible = { display: visible ? '' : 'none' }

	return <>
		<div className='pb-1 pt-1 d-flex justify-content-between align-items-baseline'
			onClick={() => setVisible(!visible)} style={{ cursor: 'pointer' }}>
			<span className='font-weight-bold'>{props.title || ''}</span>

			<Button variant='link'>
				{visible ? props.hideText || 'hide' : props.showText || 'show'}
			</Button>
		</div>
		<div style={showWhenVisible}>
			{props.children}
		</div>
	</>
}

export default Togglable