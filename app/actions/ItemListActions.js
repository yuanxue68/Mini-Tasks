import {getCookie} from './../utils/Utils'

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
}

export const CREATE_ITEMLIST_SUCCESS = 'CREATE_ITEMLIST_SUCCESS'
export const CREATE_ITEMLIST_FAILURE = 'CREATE_ITEMLIST_FAILURE'

export function createItemList(itemListInfo, boardId){
	return function(dispatch){
		return $.ajax({
			url:'/api/boards/'+boardId+"/itemLists",
			method:'POST',
			contentType: 'application/json',
			data: JSON.stringify(itemListInfo),
      headers: {"Authorization": "Bearer " + getCookie("yulloToken")}
		}).done((itemListInfo)=>{
			dispatch(createItemListSucess(itemListInfo))
		}).fail((xhr, status, err)=>{
			dispatch(createItemListFailure(xhr.responseText))
		})
	}
}

function createItemListSucess(itemListInfo){
	return {
		type: CREATE_ITEMLIST_SUCCESS,
		itemListInfo
	}
}

function createItemListFailure(error){
	return {
		type: CREATE_ITEMLIST_FAILURE,
		error
	}
}

export const DELETE_ITEMLIST_SUCCESS = 'DELETE_ITEMLIST_SUCCESS'
export const DELETE_ITEMLIST_FAILURE = 'DELETE_ITEMLIST_FAILURE'

export function deleteItemList(itemListId){
	return function(dispatch){
		return $.ajax({
			url: 'api/boards/'+itemListId,
			method: 'DELETE',
      headers: {"Authorization": "Bearer " + getCookie("yulloToken")}
		}).done(()=>{
			dispatch(deleteItemListSuccess(itemListId))
		}).fail((xhr, status, err)=>{
			dispatch(deleteItemListFailure(xhr.responseText))
		})
	}
}

function deleteItemListSuccess(itemListId){
	return {
		type: DELETE_ITEMLIST_SUCCESS,
		itemListId
	}
}

function deleteItemListFailure(error){
	return{
		type: DELETE_ITEMLIST_FAILURE,
		error
	}
}

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
}