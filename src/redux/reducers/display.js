const display = (state = {scale: 'F'}, action) => {
	switch (action.type) {
		case 'TOGGLE_SCALE':
			return Object.assign({}, state, action.obj)
		default:
			return state
	}
}

export default display
