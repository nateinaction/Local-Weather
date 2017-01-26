import React, { PropTypes } from 'react'
import { Button, Glyphicon } from 'react-bootstrap'
import './RefreshButton.css'

const RefreshButton = (props) => {
	let buttonMessage = ''
	let className = ''
	if (props.fetching) {
		buttonMessage = 'Refreshing...'
		className = 'glyph-spin'
	}
	return (
		<div className='refresh-button' onClick={() => props.onClick()}>
			<Glyphicon className={className} glyph='refresh' /><span className='refresh-message'>{buttonMessage}</span>
		</div>
	)
}
RefreshButton.propTypes =  {
	fetching: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired
}

export default RefreshButton
