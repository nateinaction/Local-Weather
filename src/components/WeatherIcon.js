import React, { PropTypes } from 'react'

const getIcon = {
	'chancerain': 'showers',
	'rain': 'showers',
	'chancesleet': 'sleet',
	'sleet': 'sleet',
	'chancesnow': 'snow',
	'snow': 'snow',
	'chanceflurries': 'snow-wind',
	'flurries': 'snow-wind',
	'chancetstorms': 'storm-showers',
	'tstorms': 'storm-showers',
	'clear': 'day-sunny',
	'partlycloudy': 'cloud',
	'cloudy': 'cloud',
	'mostlycloudy': 'cloudy',
	'partlysunny': 'day-cloudy',
	'mostlysunny': 'day-sunny-overcast',
	'sunny': 'day-sunny',
	'hazy': 'dust',
	'fog': 'fog',
	'unknown': 'day-sunny'
}

const WeatherIcon = (props) => {
	let icon = getIcon[props.icon] || 'day-sunny'
	let className = 'wi wi-' + icon
	return <i className={className} />
}
WeatherIcon.propTypes =  {
	icon: PropTypes.string
}

export default WeatherIcon
