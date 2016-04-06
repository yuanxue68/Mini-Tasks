import * as ActionTypes from './../actions/AsideActions'

export default function modals (state = {
  boardAside: false,
}, action){

	const {type} = action
	switch (type){
		case ActionTypes.TOGGLE_ASIDE:
      var afterToggle = !state[action.aside]
			return Object.assign({}, state, {[action.aside]: afterToggle})
		default:
			return state
	}
}
