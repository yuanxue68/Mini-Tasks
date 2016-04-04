import {getHost} from './../utils/Utils'

export const GET_ITEMLISTS_SUCCESS = 'GET_ITEMLISTS_SUCCESS'
export const GET_ITEMLISTS_FAILURE = 'GET_ITEMLISTS_FAILURE'
export const GET_ITEMLISTS_ERROR = 'An error has occured while getting lists of items'
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

export function getItemLists(boardId, token){
	return function(dispatch){
		return fetch(`${getHost()}/api/boards/${boardId}/itemLists`, {
			method: 'GET',
			headers: {
        "Authorization": `Bearer ${token}`
      }
		}).then((response)=>{
      if (response.status >= 400) {
        throw new Error(GET_ITEMLISTS_ERROR)
      }
      return response.json()
    }).then((data)=>{
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
		}).catch((err)=>{
			dispatch(getItemListsFailure(err.message))
		})
	}
}

export const CREATE_ITEMLIST_SUCCESS = 'CREATE_ITEMLIST_SUCCESS'
export const CREATE_ITEMLIST_FAILURE = 'CREATE_ITEMLIST_FAILURE'
export const CREATE_ITEMLIST_ERROR = 'An error has occured while creating item list'

export function createItemList(itemListInfo, boardId, token){
	return function(dispatch){
		return fetch(`${getHost()}/api/boards/${boardId}/itemLists`, {
			method:'POST',
			body: JSON.stringify(itemListInfo),
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
		}).then((response)=>{
      if(response.status >= 400){
        throw new Error(CREATE_ITEMLIST_ERROR)
      }
      return response.json()
    }).then((itemListInfo)=>{
			itemListInfo.items=[]
			dispatch(createItemListSucess(itemListInfo))
		}).catch((err)=>{
			dispatch(createItemListFailure(err.message))
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
export const DELETE_ITEMLIST_ERROR = 'An error has occured while deleting item list'

export function deleteItemList(itemListId, boardId, token){
	return function(dispatch){
		return fetch(`${getHost()}/api/boards/${boardId}/itemLists/${itemListId}`, {
			method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${token}`
      }
		}).then((response)=>{
      if (response.status >= 400){
        throw new Error(DELETE_ITEMLIST_ERROR)
      }
      return response.json()
    }).then(()=>{ 
			dispatch(deleteItemListSuccess(itemListId))
		}).catch((err)=>{
			dispatch(deleteItemListFailure(err.message))
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
		return fetch('api/boards/'+itemListInfo._id, {
			method: 'PUT',
			headers: {
        "Authorization": "Bearer " + getCookie("yulloToken")
      },
			body: JSON.stringify(itemListInfo)
		}).then((response)=>{
      if (response.status >= 400) {
        throw new Error(response.statusText)
      }
      return response.json()
    }).then((data)=>{
			dispatch(editItemListSuccess(itemListInfo))
		}).catch((err)=>{
			dispatch(editItemListFailure(err.errorMessage))
		})
	}
}
