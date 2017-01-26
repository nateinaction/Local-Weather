const defConditions = {
	location: null,
	temp: {F: null, C: null},
	condition: null,
	icon: null
}
const conditions = (state = defConditions, action) => {
	switch (action.type) {
		case 'SET_WEATHER':
			return Object.assign({}, state, action.obj)
		default:
			return state
	}
}

export default conditions
