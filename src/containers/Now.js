import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Col } from 'react-bootstrap'
import './Now.css'

import actions from '../redux/actions'
import Icon from '../components/Icon'
import Temp from '../components/Temp'
import Condition from '../components/Condition'
import Location from '../components/Location'
import RefreshButton from '../components/RefreshButton'
import Message from '../components/Message'

class Now extends Component {

	componentDidMount() {
		//this.props.handleFetchWeather()
	}

	render() {
    let hide = (this.props.weather.location === null)
		return (
    	<div className="section now-cast">
				<Col className='weather-app' xs={11} xsOffset={1}>
					<RefreshButton
						fetching={this.props.fetching}
						onClick={this.props.handleFetchCoords} />
				</Col>
    		<Col className='weather-app' xs={12}>
    			<Col xs={12} className='weather-icon' hidden={hide}>
						<Icon icon={this.props.weather.icon} />
					</Col>
					<Col xs={12} className='temp-col'>
						<Temp
							temp={this.props.weather.temp}
							scale={this.props.scale}
							onScaleClick={this.props.handleScaleClick} />
					</Col>
					<Col xs={12} className='condition-col'>
						<Condition
							condition={this.props.weather.condition} />
					</Col>
    			<Col xs={12} hidden={hide}>
						<Location
							location={this.props.weather.location} />
					</Col>
    		</Col>

				<Message
					message={this.props.message} />
      </div>
		)
	}
}
Now.propTypes = {
	weather: PropTypes.object.isRequired,
	scale: PropTypes.string.isRequired,
	fetching: PropTypes.bool.isRequired,
	message: PropTypes.string,
	handleScaleClick: PropTypes.func.isRequired,
	handleFetchWeather: PropTypes.func.isRequired,
	handleFetchCoords: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
	weather: state.conditions,
	scale: state.display.scale,
	fetching: state.fetching,
	message: state.message
})

const mapDispatchToProps = (dispatch) => ({
	handleFetchWeather: () => dispatch(actions.fetchWeather()),
	handleFetchCoords: () => dispatch(actions.fetchCoords()),
	handleScaleClick: () => dispatch(actions.scaleClick())
})

const NowContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Now)

export default NowContainer
