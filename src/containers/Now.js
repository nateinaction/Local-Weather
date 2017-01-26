import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Grid, Row,  Col } from 'react-bootstrap'
import './now.css'

import actions from '../redux/actions'
import WeatherIcon from '../components/WeatherIcon'
import WeatherTempAndCondition from '../components/WeatherTempAndCondition'
import WeatherLocation from '../components/WeatherLocation'
import RefreshButton from '../components/RefreshButton'
import Message from '../components/Message'

class Now extends Component {

	componentDidMount() {
		//this.props.handleFetchWeather()
	}

	render() {
    let hide = (this.props.weather.location === null)
		return (
      <Grid className="section light-section weather" fluid>
        <Row>
					<Col className='weather-app' xs={1} xsOffset={1}>
						<RefreshButton
							fetching={this.props.fetching}
							onClick={this.props.handleFetchCoords} />
					</Col>
      		<Col className='weather-app' xs={12}>
      			<Col xs={12} className='weather-icon' hidden={hide}>
							<WeatherIcon icon={this.props.weather.icon} />
						</Col>
      			<Col xs={12} hidden={hide}>
      				<WeatherTempAndCondition
      					weather={this.props.weather}
      					scale={this.props.scale}
      					handleScaleClick={this.props.handleScaleClick} />
      			</Col>
      			<Col xs={12} hidden={hide}>
							<WeatherLocation location={this.props.weather.location} />
						</Col>
      		</Col>

					<Message
						message={this.props.message} />
        </Row>
      </Grid>
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
	handleFetchWeather: (lat, lon) => dispatch(actions.fetchWeather(lat, lon)),
	handleFetchCoords: () => dispatch(actions.fetchCoords()),
	handleScaleClick: () => dispatch(actions.scaleClick())
})

const NowContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Now)

export default NowContainer
