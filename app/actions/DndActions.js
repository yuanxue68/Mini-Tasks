import {getHost} from './../utils/Utils'

export const ItemTypes = {
  ITEM: 'item'
};


export const MOVE_ITEM_SUCCESS = 'MOVE_ITEM_SUCCESS'
export const MOVE_ITEM_FAILURE = 'MOVE_ITEM_FAILURE'
export const MOVE_ITEM_ERROR = 'Failed to move this item'

export function moveItem(from, targetItemListId, token){
	var oldItemList = JSON.parse(JSON.stringify(from.itemListId))
	from.itemListId = targetItemListId
	return function(dispatch){
		return fetch(`${getHost()}/api/items/${from._id}`, {
			method: 'PUT',
			headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
			body: JSON.stringify(from)
		}).then((response)=>{
      if (response.status >= 400) {
        throw new Error(MOVE_ITEM_ERROR)
      }
      return response.json()
    }).then((data)=>{
			dispatch(moveItemSuccess(from, oldItemList))
		}).catch((err)=>{
			dispatch(moveItemFailure(err.message))
		})
	}
}

function moveItemSuccess(newItemListInfo, oldItemList){
	return {
		type: MOVE_ITEM_SUCCESS,
		itemListInfo: newItemListInfo,
		oldItemList
	}
}


function moveItemFailure(error){
	return {
		type: MOVE_ITEM_FAILURE,
		error
	}
}
