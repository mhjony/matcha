const handleLogout = (wsClient, user_id) => {
	localStorage.clear()
	wsClient.current.send(JSON.stringify(({
		type: 'close',
		from: user_id
	})))
	window.location.href='/login'
}

export default { handleLogout }