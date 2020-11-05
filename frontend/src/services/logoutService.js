const handleLogout = () => {
	localStorage.removeItem('loggedMatchaUser');
	window.location.href="/login";
}

export default { handleLogout };