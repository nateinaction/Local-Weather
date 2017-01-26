import React, { PropTypes } from 'react'
import { Col } from 'react-bootstrap'

import WeatherIcon from './WeatherIcon'
import WeatherTempAndCondition from './WeatherTempAndCondition'
import WeatherLocation from './WeatherLocation'
import RefreshButton from './RefreshButton'
import Message from './Message'

const WeatherApp = (props) => {
	let hide = (props.weather.location === null)
	return (
		<Col className='weather-app' xs={12} md={5}>
			<Col xs={12} className='weather-icon' hidden={hide}><WeatherIcon icon={props.weather.icon} /></Col>
			<Col xs={12} hidden={hide}>
				<WeatherTempAndCondition
					weather={props.weather}
					scale={props.scale}
					handleScaleClick={props.handleScaleClick} />
			</Col>
			<Col xs={12} hidden={hide}><WeatherLocation location={props.weather.location} /></Col>
			<Col className='text-center' xs={12}>
				<RefreshButton
					fetching={props.fetching}
					onClick={props.handleFetchCoords} />
			</Col>
			<Col xs={12}>
				<Message
					message={props.message} />
			</Col>
		</Col>
	)
}
WeatherApp.propTypes =  {
	weather: PropTypes.object.isRequired,
	scale: PropTypes.string.isRequired,
	fetching: PropTypes.bool.isRequired,
	message: PropTypes.string,
	handleScaleClick: PropTypes.func.isRequired,
	handleFetchCoords: PropTypes.func.isRequired
}

export default WeatherApp
