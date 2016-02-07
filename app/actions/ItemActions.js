import {getCookie} from './../utils/Utils'

/*
export const GET_ITEMLISTS_SUCCESS = 'GET_ITEMLISTS_SUCCESS'
export const GET_ITEMLISTS_FAILURE = 'GET_ITEMLISTS_FAILURE'

function getItemListsSuccess(itemLists){
	return {
		type: GET_ITEMLISTS_SUCCESS,
		itemLists
	}
}

function getItemListsFailure(error){
	return {
		type: GET_ITEMLISTS_FAILURE,
		error
	}
}

export function getItemLists(boardId){
	return function(dispatch){
		return $.ajax({
			url: '/api/boards/'+boardId+"/itemLists",
			method: 'GET',
			headers: {"Authorization": "Bearer " + getCookie("yulloToken")}
		}).done((data)=>{
			var itemLists = []
			//nest items related to an item list inside an itemlist object
			data.itemLists.forEach(function(itemList){
				itemList.items=[]
				data.items.forEach(function(item){
					if(item._id === itemList._id){
						itemList.items = item.items;
					}
				})
				itemLists.push(itemList)
			})
			dispatch(getItemListsSuccess(itemLists))
		}).fail((xhr, status, err)=>{
			dispatch(getItemListsFailure(xhr.responseText))
		})
	}
}

function organizeItemLists(data){
	data.itemLists.forEach(function(itemList){

	});
}*/

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

/*
export const EDIT_ITEMLIST_SUCCESS = 'EDIT_ITEMLIST_SUCCESS'
export const EDIT_ITEMLIST_FAILURE = 'EDIT_ITEMLIST_FAILURE'

function editItemListSuccess(itemListInfo){
	return {
		type: EDIT_ITEMLIST_SUCCESS,
		itemListInfo
	}
}

function editItemListFailure(error){
	return {
		type: EDIT_ITEMLIST_FAILURE,
		error
	}
}

export function editItemList(itemListInfo){
	return function(dispatch){
		return $.ajax({
			url: 'api/boards/'+itemListInfo._id,
			method: 'PUT',
			headers: {"Authorization": "Bearer " + getCookie("yulloToken")},
			data: JSON.stringify(itemListInfo)
		}).done((data)=>{
			dispatch(editItemListSuccess(itemListInfo))
		}).fail((xhr, status, err)=>{
			dispatch(editItemListFailure(xhr.responseText))
		})
	}
}*/