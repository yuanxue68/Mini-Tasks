import {getCookie} from './../utils/Utils'

export const ItemTypes = {
  ITEM: 'item'
};


export const MOVE_ITEM_SUCCESS = 'MOVE_ITEM_SUCCESS'
export const MOVE_ITEM_FAILURE = 'MOVE_ITEM_FAILURE'

export function moveItem(from, targetItemListId){
	var oldItemList = from.itemListId
	from.itemListId = targetItemListId
	console.log(from.itemListId)
	return function(dispatch){
		return fetch('/api/items/'+from._id, {
			method: 'PUT',
			headers: {
        "Authorization": "Bearer " + getCookie("yulloToken")
      },
			body: JSON.stringify(from)
		}).then((response)=>{
      if (response.status >= 400) {
        throw new Error(response.statusText)
      }
      return response.json()
    }).then((data)=>{
			dispatch(moveItemSuccess(from, oldItemList))
		}).catch((err)=>{
			dispatch(moveItemFailure(err.errorMessage))
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
