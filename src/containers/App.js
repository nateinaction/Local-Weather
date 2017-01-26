import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import ReactSwipe from 'react-swipe'

import './App.css'
import actions from '../redux/actions'
import Now from './Now'
import Today from './Today'
import Forecast from './Forecast'

class App extends Component {

	componentDidMount() {
		//this.props.handleFetchCoords()
	}

	render() {
		return (
      <ReactSwipe className='weather-app' swipeOptions={{continuous: false}}>
        <Now />
        <Today />
        <Forecast />
      </ReactSwipe>
    )
	}
}
App.propTypes = {
	handleFetchCoords: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
	handleFetchCoords: () => dispatch(actions.fetchCoords())
})

const AppContainer = connect(
	mapDispatchToProps
)(App)

export default AppContainer
