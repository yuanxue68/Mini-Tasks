import {getCookie} from './../utils/Utils'


export const POPULATE_ITEM_SUCCESS = 'POPULATE_ITEM_SUCCESS'


export function populateItemToModal(itemInfo){
	return {
		type: POPULATE_ITEM_SUCCESS,
		itemInfo
	}
}


export const CREATE_ITEM_SUCCESS = 'CREATE_ITEM_SUCCESS'
export const CREATE_ITEM_FAILURE = 'CREATE_ITEM_FAILURE'

export function createItem(item){
	return function(dispatch){
		return $.ajax({
			url:'/api/items',
			method:'POST',
			contentType: 'application/json',
			data: JSON.stringify(item),
      headers: {"Authorization": "Bearer " + getCookie("yulloToken")}
		}).done((item)=>{
			dispatch(createItemSuccess(item))
		}).fail((xhr, status, err)=>{
			dispatch(createItemFailure(xhr.responseText))
		})
	}
}

function createItemSuccess(item){
	return {
		type: CREATE_ITEM_SUCCESS,
		item
	}
}

function createItemFailure(error){
	return {
		type: CREATE_ITEM_FAILURE,
		error
	}
}

export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS'
export const DELETE_ITEM_FAILURE = 'DELETE_ITEM_FAILURE'

export function deleteItem(itemId, itemListId){
	return function(dispatch){
		return $.ajax({
			url: 'api/items/'+itemId,
			method: 'DELETE',
      headers: {"Authorization": "Bearer " + getCookie("yulloToken")}
		}).done(()=>{
			dispatch(deleteItemSuccess(itemId, itemListId))
		}).fail((xhr, status, err)=>{
			dispatch(deleteItemFailure(xhr.responseText))
		})
	}
}

function deleteItemSuccess(itemId, itemListId){
	return {
		type: DELETE_ITEM_SUCCESS,
		itemId,
		itemListId
	}
}

function deleteItemFailure(error){
	return{
		type: DELETE_ITEM_FAILURE,
		error
	}
}

export const EDIT_ITEM_SUCCESS = 'EDIT_ITEM_SUCCESS'
export const EDIT_ITEM_FAILURE = 'EDIT_ITEM_FAILURE'

function editItemSuccess(itemInfo){
	return {
		type: EDIT_ITEM_SUCCESS,
		itemInfo
	}
}

function editItemFailure(error){
	return {
		type: EDIT_ITEMLIST_FAILURE,
		error
	}
}

export function editItem(itemInfo){
	return function(dispatch){
		return $.ajax({
			url: 'api/items/'+itemInfo._id,
			method: 'PUT',
			contentType: 'application/json',
			headers: {"Authorization": "Bearer " + getCookie("yulloToken")},
			data: JSON.stringify(itemInfo)
		}).done((data)=>{
			dispatch(editItemSuccess(itemInfo))
		}).fail((xhr, status, err)=>{
			dispatch(editItemFailure(xhr.responseText))
		})
	}
}