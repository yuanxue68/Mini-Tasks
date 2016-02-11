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
		return $.ajax({
			url: 'api/items/'+from._id,
			method: 'PUT',
			headers: {"Authorization": "Bearer " + getCookie("yulloToken")},
			type: 'application/json',
			data: from
		}).done((data)=>{
			dispatch(moveItemSuccess(from, oldItemList))
		}).fail((xhr, status, err)=>{
			dispatch(moveItemFailure(xhr.responseText))
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