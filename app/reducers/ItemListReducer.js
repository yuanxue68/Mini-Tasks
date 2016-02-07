import * as ActionTypes from './../actions/itemListActions'
import * as ItemActionTypes from './../actions/itemActions'

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
		case ItemActionTypes.CREATE_ITEM_SUCCESS:
			var newState = []
			state.forEach(function(itemList){
				if(itemList._id === action.item.itemListId){
					itemList.items.push(action.item)
					newState.push(itemList)
				} else {
					newState.push(itemList)
				}
			})
			return newState
		case ItemActionTypes.DELETE_ITEM_SUCCESS:
			var newState = []
			state.forEach(function(itemList){
				if(itemList._id === action.itemListId){
					var items = []
					itemList.items.forEach(function(item){
						if(item._id !== action.itemId){
							items.push(item)
						}
					})
					itemList.items = items
					newState.push(itemList)
				} else {
					newState.push(itemList)
				}
			})
			return newState
		default:
			return state
	}
}