import React, { PropTypes } from 'react'

const ControlBar = (props) => (
	<Navbar collapseOnSelect>
		<Navbar.Header>
			<Navbar.Brand>
				Local Weather
			</Navbar.Brand>
			<Navbar.Toggle />
		</Navbar.Header>
		<Navbar.Collapse>
			<Nav pullRight>
				<RefreshButton
					fetching={props.fetching}
					onRefreshClick={props.handleRefreshClick} />
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)
ControlBar.propTypes =  {
	fetching: PropTypes.object.isRequired,
	handleRefreshClick: PropTypes.func.isRequired
}

export default ControlBar
