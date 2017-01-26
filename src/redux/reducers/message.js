const message = (state = null, action) => {
	switch (action.type) {
		case 'FETCHING':
			return null
		case 'SET_MESSAGE':
			return action.message
		default:
			return state
	}
}

export default message
