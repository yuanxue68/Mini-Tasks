import * as ActionTypes from './../actions/ModalActions'

export default function modals (state = {
  boardCreation: false,
  listCreation: false,
  itemInfo: false
}, action){

	const {type} = action
	switch (type){
		case ActionTypes.OPEN_MODAL:
			return Object.assign({}, state, {[action.modal]: true})
		case ActionTypes.CLOSE_MODAL:
			return Object.assign({}, state, {[action.modal]: false})
		default:
			return state
	}
}
