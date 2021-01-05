export const userGeoLocation = () => {
	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position => {
			if (!position.coords.longitude || !position.coords.latitude)
				return
			else{
				localStorage.setItem('coordinates', JSON.stringify({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude
				}))
			}
		})
	}
}
/*
export const getGeoLocation = ()  => {
	const coords = localStorage.getItem('coordinates');
	localStorage.removeItem('coordinates');

	if (!coords)
	{
		return {
			latitude: null,
			longitude: null
		}
	}
	else {
		const parsed = JSON.parse(coords)
		return {
			latitude: parsed.latitude,
			longitude: parsed.longitude
		}
	}
}*/