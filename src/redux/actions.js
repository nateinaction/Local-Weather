import axios from 'axios';

const setMessage = (message) => ({
	type: 'SET_MESSAGE',
	message
})

const setFetching = () => ({
	type: 'FETCHING'
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
	(dispatch, getState) => {
		let { weather } = getState()
		let obj = (weather.display.scale === 'F') ? {scale: 'C'} : {scale: 'F'}
		return dispatch(toggleScale(obj))
	}
)

const fetchWeather = (lat, lon) => {
	if (!lat || !lon) {
		lat = 30.223221
  	lon = -97.740359
	}
	let url = 'https://nates-api.mybluemix.net/weather'
	let config = {
		params: {
			lat,
			lon
		}
	}
  return dispatch => {
    dispatch(setFetching())
    return axios.get(url, config)
			.then(response => {
				return dispatch(setWeather(response.data))
			})
		  .catch(err => {
				if (err) console.log(err)
		  	return dispatch(setMessage('Unable to connect to Weather Underground. Please check your internet connection.'))
		  });
  }
}

const fetchCoords = () => (
  (dispatch) => {
		dispatch(setFetching())
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


const actions = {
  scaleClick,
  fetchWeather,
	fetchCoords
}

export default actions
