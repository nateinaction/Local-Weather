import React, { PropTypes } from 'react'
import { Button, Glyphicon } from 'react-bootstrap'

const RefreshButton = (props) => {
	let buttonMessage = 'Check your local weather'
	let glyph = 'map-marker'
	let className = ''
	if (props.fetching) {
		buttonMessage = 'Checking...'
		glyph = 'refresh'
		className = 'glyph-spin'
	}
	return (
		<Button disabled={props.fetching} onClick={() => props.onClick()}>
			<Glyphicon className={className} glyph={glyph} />{' ' + buttonMessage}
		</Button>
	)
}
RefreshButton.propTypes =  {
	fetching: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired
}

export default RefreshButton
