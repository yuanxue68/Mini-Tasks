import * as ActionTypes from './../actions/MemberActions'

export default function members (state = [], action){
	const {type} = action
	switch (type){
		case ActionTypes.GET_MEMBERS_SUCCESS:
			return action.members
		case ActionTypes.CREATE_MEMBERS_SUCCESS:
			for(var i = 0; i<state.length; i++){
				if(state[i]._id === action.member._id){
					return [...state]
				}
			}
			return [...state, action.member]
		case ActionTypes.DELETE_MEMBER_SUCCESS:
			var newState = []
			state.forEach(function(member){
				if(member._id !== action.userId){
					newState.push(member)
				}
			})
			return newState
		default:
			return state
	}
}