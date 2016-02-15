import * as ActionTypes from './../actions/BoardActions'

export default function boardInfo (state = {}, action){
	const {type} = action
	switch (type){
		case ActionTypes.GET_BOARD_SUCCESS:
			return action.boardInfo
		case ActionTypes.EDIT_BOARD_SUCCESS:
			return action.boardInfo
		case ActionTypes.CHANGE_BOARD_INPUT:
			return action.boardInfo
		default:
			return state
	}
}