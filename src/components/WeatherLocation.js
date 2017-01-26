import React, { PropTypes } from 'react'

const WeatherLocation = (props) => (
	<h1>{props.location}</h1>
)
WeatherLocation.propTypes =  {
	location: PropTypes.string
}

export default WeatherLocation
