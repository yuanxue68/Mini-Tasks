import * as ActionTypes from './../actions/itemListActions'
import * as ItemActionTypes from './../actions/itemActions'
import * as DndActionTypes from './../actions/DndActions'

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
				if(itemList._id === action.itemListInfo._id){
					newState.push(action.itemListInfo)
				} else {
					newState.push(itemList)
				}
			})
			return newState
    case ActionTypes.ARCHIVE_ITEMLIST_SUCCESS:
      var newState = []
      state.forEach((itemList)=>{
        if(itemList._id != action.itemListId){
          newState.push(itemList)
        }
      })
      return newState
    case ActionTypes.RESTORE_ARCHIVED_ITEMLIST:
      return [...state, action.itemListInfo]
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
		case ItemActionTypes.EDIT_ITEM_SUCCESS:
			var newState = []
			state.forEach(function(itemList){
				if(itemList._id === action.itemInfo.itemListId){
					var newList = []
					itemList.items.forEach(function(item){
						if(item._id === action.itemInfo._id){
							newList.push(action.itemInfo)
						} else {
							newList.push(item)
						}
					})
					itemList.items = newList
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
    case DndActionTypes.MOVE_ITEMLIST:
        var newState = []
        state.forEach((itemList)=>{
          if(itemList._id !== action.draggedItemList._id){
            newState.push(itemList)
          }
        })
        return [
          ...newState.slice(0, action.hoveredIndex),
          action.draggedItemList,
          ...newState.slice(action.hoveredIndex)
        ]
    case DndActionTypes.HOVER_ITEM:
      var newState = []
      const {draggedItem, draggedIndex, hoveredItem, hoveredIndex} = action
      state.forEach((itemList)=>{
        var newList = []
        itemList.items.forEach((item)=>{
          if(item._id !== draggedItem._id){
            newList.push(item)
          }
        })
        itemList.items = newList
        newState.push(itemList)
      })
  
      newState.forEach((itemList, index)=>{
        if(itemList._id === hoveredItem.itemListId){
          draggedItem.itemListId = itemList._id
          newState[index].items = [
            ...itemList.items.slice(0, hoveredIndex),
            draggedItem,
            ...itemList.items.slice(hoveredIndex)
          ] 
        }
      })
      
      return newState 
		default:
			return state
	}
}
