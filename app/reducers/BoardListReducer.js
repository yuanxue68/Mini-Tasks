import * as ActionTypes from './../actions/BoardListActions'

export default function boardList (state = [], action){
	const {type} = action
	switch (type){
		case ActionTypes.GET_BOARDS_SUCCESS:
			return action.boardList
		case ActionTypes.CREATE_BOARD_SUCCESS:
			return [...state, action.boardInfo]
		case ActionTypes.DELETE_BOARD_SUCCESS:
			var newState = []
			state.forEach(function(board){
				if(board._id !== action.boardId){
					newState.push(board)
				}
			})
			return newState
		case ActionTypes.EDIT_BOARD_SUCCESS:
			var newState = []
			state.forEach(function(board){
				if(board._id === action.boardInfo._id){
					newState.push(action.boardInfo)
				} else {
					newState.push(board)
				}
			})
			return newState
		default:
			return state
	}
}