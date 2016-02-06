import * as ActionTypes from './../actions/itemListActions'

export default function itemLists (state = [], action){
	const {type} = action
	switch (type){
		case ActionTypes.GET_ITEMLISTS_SUCCESS:
			return action.itemLists
		case ActionTypes.CREATE_ITEMLIST_SUCCESS:
			return [...state, action.itemListInfo]
		case ActionTypes.DELETE_ITEMLIST_SUCCESS:
			var newState = []
			state.forEach(function(itemList){
				if(itemList._id !== action.itemListId){
					newState.push(itemList)
				}
			})
			return newState
		case ActionTypes.EDIT_ITEMLIST_SUCCESS:
			var newState = []
			state.forEach(function(itemList){
				if(itemList._id === action.itemList._id){
					newState.push(action.itemListInfo)
				} else {
					newState.push(itemList)
				}
			})
			return newState
		default:
			return state
	}
}