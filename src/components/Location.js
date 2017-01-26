import React, { PropTypes } from 'react'

const Location = (props) => (
	<h1>{props.location}</h1>
)
Location.propTypes =  {
	location: PropTypes.string
}

export default Location
