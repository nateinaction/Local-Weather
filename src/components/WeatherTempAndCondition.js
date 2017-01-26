import React, { PropTypes } from 'react'
import { Col } from 'react-bootstrap'

import WeatherTemp from './WeatherTemp'
import WeatherCondition from './WeatherCondition'

const WeatherTempAndCondition = (props) => (
	<div>
	<Col xs={12} className='temp-col'>
		<WeatherTemp
			temp={props.weather.temp}
			scale={props.scale}
			onScaleClick={props.handleScaleClick} />
	</Col>
	<Col xs={12} className='condition-col'>
		<WeatherCondition
			condition={props.weather.condition} />
	</Col>
	</div>
)
WeatherTempAndCondition.propTypes =  {
	weather: PropTypes.object.isRequired,
	scale: PropTypes.string.isRequired,
	handleScaleClick: PropTypes.func.isRequired
}

export default WeatherTempAndCondition
