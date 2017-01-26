const fetching = (state = false, action) => {
	switch (action.type) {
		case 'FETCHING':
			return true
		case 'SET_WEATHER':
		case 'SET_MESSAGE':
			return false
		default:
			return state
	}
}

export default fetching
