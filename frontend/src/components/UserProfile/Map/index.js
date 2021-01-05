import React, { useEffect, useState } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { api } from '../../../secret.json'
import userService from '../../../services/userService'

const containerStyle = {
	width: '90vw',
	height: '90vw',
	maxWidth: '400px',
	maxHeight: '400px',
	margin: '2em auto'
}

const Map = ({ user, setUser }) => {
	const [mapCentre, setMapCentre] = useState({ lat: 0, lng: 0 })

	useEffect(() => {
		setMapCentre({ lat: user.latitude, lng: user.longitude })
	}, [user])

	const dragEndHandler= (e) => {
		const latitude = e.latLng.lat()
		const longitude = e.latLng.lng()
		const userObject = {
			latitude,
			longitude
		}

		userService.updateUser(userObject, user.user_id)
			.then(res => {
				setUser({ ...user, latitude: res.latitude, longitude: res.longitude })
			})
			.catch(e => {
				console.log('Database error', e)
			})
	}

	return (
		<LoadScript googleMapsApiKey={api} >
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={mapCentre}
				zoom={6}
			>
				<Marker
					draggable={true}
					position={mapCentre}
					onDragEnd= {event => dragEndHandler(event)}
				/>
			</GoogleMap>
		</LoadScript>
	)
}

export default Map