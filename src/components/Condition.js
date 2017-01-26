import React, { PropTypes } from 'react'

const Condition = (props) => (
	<h3>{props.condition}</h3>
)
Condition.propTypes =  {
	condition: PropTypes.string
}

export default Condition
