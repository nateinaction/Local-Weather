import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios';
import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux'
import { Grid, Col, Navbar, Nav, NavItem, Glyphicon, Alert } from 'react-bootstrap'
import './index.scss';

/*
{
	message: 'Could not access your location.'
	display: {scale: 'F'},
	fetching: {coords: false, weather: false},
	weather: {
		location: 'Austin, TX',
		temp: {F: 45, C: 7},
		condition: 'cloudy',
		imgSrc: 'https://blah.com/cloudy.jpg'
	}
}
*/

/*
 * Redux Action Creators
 */

const setMessage = (message) => ({
	type: 'SET_MESSAGE',
	message
})

const setFetchingCoords = () => ({
	type: 'FETCHING_COORDS'
})

const setFetchingWeather = () => ({
	type: 'FETCHING_WEATHER'
})

const setWeather = (obj) => ({
	type: 'SET_WEATHER',
	obj
})

const toggleScale = (obj) => ({
	type: 'TOGGLE_SCALE',
	obj
})

const scaleClick = () => (
	(dispatch, getState) {
		let { display } = getState()
		let obj = (display.scale === 'F') ? {scale: 'C'} : {scale: 'F'}
		return dispatch(toggleScale(obj))
	}
)

const makeWeatherObj = (data) => ({
	location: data.display_location.full,
	temp: {F: data.temp_f, C: data.temp_c},
	condition: data.weather,
	icon: data.icon
})

const apiKey = '7a367f6489a8fc35'
const fetchWeather = (lat, lon) => {
	let url = 'https://api.wunderground.com/api/' + apiKey + '/conditions/q/'
	url += lat + ',' + lon + '.json'
  return dispatch => {
    dispatch(setFetchingWeather())
    return axios.get(url)
			.then(response => {
				let obj = makeWeatherObj(response.data.current_observation)
				//console.log(obj)
				return dispatch(setWeather(obj))
			})
		  .catch(err => {
				if (err) {
        	console.log(err.stack);
    		}
		  	return dispatch(setMessage('Unable to connect to Weather Underground. Please check your internet connection.'))
		  });
  }
}

const fetchCoords = () => (
  (dispatch) => {
    dispatch(setFetchingCoords())
    navigator.geolocation.getCurrentPosition((pos) => {
			return dispatch(fetchWeather(pos.coords.latitude, pos.coords.longitude))
		}, (err) => {
			if (err) {
        console.log(err.stack);
    	}
			return dispatch(setMessage('Unable to access your location. Please check your privacy settings.'))
		})
  }
)

/*
 * Redux Reducers
 */

const message = (state = null, action) => {
	switch (action.type) {
		case 'FETCHING_COORDS':
		case 'FETCHING_WEATHER':
			return null
		case 'SET_MESSAGE':
			return action.message
		default:
			return state
	}
}

const display = (state = {scale: 'F'}, action) => {
	switch (action.type) {
		case 'TOGGLE_SCALE':
			return Object.assign({}, state, action.obj)
		default:
			return state
	}
}

const defFetching = { coords: false, weather: false }
const fetching = (state = defFetching, action) => {
	switch (action.type) {
		case 'FETCHING_COORDS':
			return Object.assign({}, state, { coords: true })
		case 'FETCHING_WEATHER':
			return Object.assign({}, state, { coords: false, weather: true })
		case 'SET_WEATHER':
		case 'SET_MESSAGE':
			return defFetching
		default:
			return state
	}
}

const defWeather = {
	location: null,
	temp: {F: null, C: null},
	condition: null,
	icon: null
}
const weather = (state = defWeather, action) => {
	switch (action.type) {
		case 'SET_WEATHER':
			return Object.assign({}, state, action.obj)
		default:
			return state
	}
}

const weatherApp = combineReducers({
	message,
	display,
	fetching,
	weather
})

/*
 * Redux Store
 */

let store = createStore(weatherApp, applyMiddleware(
	thunkMiddleware
))

/*
 * Redux state to console log
 */

console.log('initial state')
console.log(store.getState())
store.subscribe(() => console.log(store.getState()))

/*
 * Init weather app
 */

console.log('Try fetching location...')
store.dispatch(fetchCoords())

/*
 * Helper Fns
 */

const isFetching = (fetching) => (
	(fetching.coords || fetching.weather)
)

/*
 * React Presentational Components
 */

const RefreshButton = (props) => {
	let fetchingBool = isFetching(props.fetching)
	let buttonMessage = (fetchingBool) ? 'Refreshing...' : 'Refresh'
	return (
		<NavItem disabled={fetchingBool} onClick={props.onRefreshClick}><Glyphicon className='glyph-spin' glyph='refresh' /> {buttonMessage}</NavItem>
	)
}

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

const WeatherIcon = (props) => (
	<i className={'wi wi-wu-' + props.icon} />
)

const WeatherTemp = (props) => (
	<span className='temp' onClick={() => props.onScaleClick()}>{props.temp[props.scale]}°{props.scale}</span>
)

const WeatherCondition = (props) => (
	<span>{props.condition}</span>
)

const WeatherTempAndCondition = (props) => (
	<h3>
		{'It is '}
		<WeatherTemp
			temp={props.weather.temp}
			scale={props.scale}
			onScaleClick={props.handleScaleClick} />
		{' and '}
		<WeatherCondition
			condition={props.weather.condition} />
	</h3>
)

const WeatherLocation = (props) => (
	<h1>in {props.location}</h1>
)

const Weather = (props) => {
	let hideContent = (isFetching(props.fetching) || props.message !== null)
	return (
		<Grid className='weather-container' hidden={hideContent}>
			<Col xs={12} className='weather-icon'><WeatherIcon icon={props.weather.icon} /></Col>
			<Col xs={12}>
				<WeatherTempAndCondition
					weather={props.weather}
					scale={props.scale}
					handleScaleClick={props.handleScaleClick} />
			</Col>
			<Col xs={12}><WeatherLocation location={props.weather.location} /></Col>
		</Grid>
	)
}

const Message = (props) => (
	<Grid>
		<Col xs={10} xsOffset={1} md={8} mdOffset={2}>
			<Alert bsStyle="danger" hidden={(props.message === null)}>
		    <h4>Uh oh!</h4>
		    <p>{props.message}</p>
		  </Alert>
		</Col>
	</Grid>
)

/*
 * React-Redux Container Components
 */

const mapStateToProps = (state) => ({
	fetching: state.fetching
})

const mapDispatchToProps = (dispatch) => ({
	handleRefreshClick: () => dispatch(fetchCoords())
})

const ControlBarContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ControlBar)

const mapStateToPropsTwo = (state) => ({
	weather: state.weather,
	scale: state.display.scale,
	fetching: state.fetching,
	message: state.message
})

const mapDispatchToPropsTwo = (dispatch) => ({
	handleScaleClick: () => dispatch(scaleClick())
})

const WeatherContainer = connect(
	mapStateToPropsTwo,
	mapDispatchToPropsTwo
)(Weather)

const mapStateToPropsThree = (state) => ({
	message: state.message
})

const mapDispatchToPropsThree = (dispatch) => ({
	handleRefreshClick: () => dispatch(fetchCoords())
})

const MessageContainer = connect(
	mapStateToPropsThree,
	mapDispatchToPropsThree
)(Message)

/*
 * React Root Component
 */

const App = (props) => (
	<div className="App">
	  <ControlBarContainer />
		<WeatherContainer />
		<MessageContainer />
  </div>
)

/*
 * React Dom
 */

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
