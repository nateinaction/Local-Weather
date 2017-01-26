import { combineReducers } from 'redux'

import message from './message'
import display from './display'
import fetching from './fetching'
import conditions from './conditions'

const reducers = combineReducers({
	message,
	display,
	fetching,
	conditions
})

export default reducers
