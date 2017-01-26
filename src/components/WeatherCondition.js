import React, { PropTypes } from 'react'

const WeatherCondition = (props) => (
	<h3>{props.condition}</h3>
)
WeatherCondition.propTypes =  {
	condition: PropTypes.string
}

export default WeatherCondition
