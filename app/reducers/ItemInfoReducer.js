import * as ActionTypes from './../actions/ItemActions'

export default function itemInfo (state = {}, action){
	const {type} = action
	switch (type){
		case ActionTypes.POPULATE_ITEM_SUCCESS:
			return action.itemInfo
		default:
			return state
	}
}