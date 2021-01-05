const geoIP = require('geoip-lite')
const axios = require('axios')

const validateCoordinate = coordinate => {

	return coordinate && !isNaN(coordinate) && coordinate >= -180 && coordinate <= 180
}

const getLoginCoordinates = async (req) => {

	if (validateCoordinate(req.body.latitude) && validateCoordinate(req.body.longitude))
		return { 'latitude': req.body.latitude, 'longitude': req.body.longitude }

	const lookup = geoIP.lookup(req.ip)

	if (lookup && lookup.ll)
		return { 'latitude': lookup.ll[0], 'longitude': lookup.ll[1] }

	var location = await axios.get('https://ipinfo.io/geo')
	var locs = location.data.loc.split(',')

	return { latitude: locs[0], longitude: locs[1] }
}

module.exports = { getLoginCoordinates }
