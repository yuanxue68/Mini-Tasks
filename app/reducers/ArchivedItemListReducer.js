import * as ActionTypes from './../actions/itemListActions'

export default function archivedItemLists (state = [], action){
	const {type} = action
	switch (type){
	  case ActionTypes.GET_ARCHIVED_ITEMLISTS_SUCCESS:
      return action.itemLists
    case ActionTypes.RESTORE_ARCHIVED_ITEMLIST:
      var newState = []
      state.forEach((list)=>{
        if(list._id != action.itemListInfo._id){
          newState.push(list)
        }
      })
      return newState
    default:
      return state
  }
}
