import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers/index'

/*
 * Example Object
 */

/*
weather: {
	message: 'Could not access your location.'
	display: {scale: 'F'},
	fetching: {coords: false, weather: false},
	weather: {
		location: 'Austin, TX',
		temp: {F: 45, C: 7},
		condition: 'cloudy',
		icon: 'cloudy'
	}
}
*/

/*
 * Redux Store
 */

let store = createStore(reducers, applyMiddleware(
	thunk
))

export default store

/*
 * Redux state to console log
 */

console.log('initial state')
console.log(store.getState())
store.subscribe(() => console.log(store.getState()))
