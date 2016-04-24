import {getHost} from './../utils/Utils'

export const GET_ITEMLISTS_SUCCESS = 'GET_ITEMLISTS_SUCCESS'
export const GET_ITEMLISTS_FAILURE = 'GET_ITEMLISTS_FAILURE'
export const GET_ITEMLISTS_REQUEST = 'GET_ITEMLISTS_REQUEST'
export const GET_ARCHIVED_ITEMLISTS_REQUEST = 'GET_ARCHIVED_ITEMLISTS_REQUEST'
export const GET_ARCHIVED_ITEMLISTS_FAILURE = 'GET_ARCHIVED_ITEMLISTS_FAILURE'
export const GET_ARCHIVED_ITEMLISTS_SUCCESS = 'GET_ARCHIVED_ITEMLISTS_SUCCESS'
export const GET_ITEMLISTS_ERROR = 'An error has occured while getting lists of items'
function getItemListsSuccess(itemLists){
	return {
		type: GET_ITEMLISTS_SUCCESS,
		itemLists
	}
}

function getItemListsRequest(){
  return {
    type: GET_ITEMLISTS_REQUEST
  }
}

function getArchivedItemListsRequest(){
  return {
    type: GET_ARCHIVED_ITEMLISTS_REQUEST
  }
}

function getArchivedItemListsSuccess(itemLists){
  return {
    type: GET_ARCHIVED_ITEMLISTS_SUCCESS,
    itemLists
  }
}

function getItemListsFailure(error){
	return {
		type: GET_ITEMLISTS_FAILURE,
		error
	}
}

function getArchivedItemListsFailure(error){
	return {
		type: GET_ARCHIVED_ITEMLISTS_FAILURE,
		error
	}
}

export function getItemLists(boardId, token, archived=false, page=0){
  const url = archived ? `${getHost()}/api/boards/${boardId}/itemLists?archived=${archived}&page=${page}` 
              :`${getHost()}/api/boards/${boardId}/itemLists` 
	return function(dispatch){
    archived ? dispatch(getArchivedItemListsRequest()) : dispatch(getItemListsRequest())
		return fetch (url, {
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
			archived ? dispatch(getArchivedItemListsSuccess(itemLists)) : dispatch(getItemListsSuccess(itemLists))
		}).catch((err)=>{
			archived ? dispatch(getArchivedItemListsFailure(err.message)) : dispatch(getItemListsFailure(err.message))
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
export const EDIT_ITEMLIST_ERROR = 'An error has occured while editing item list'
export const EDIT_ITEMLIST_MESSAGE = "Successfully edited item list"
function editItemListSuccess(itemListInfo, notification){
	return {
		type: EDIT_ITEMLIST_SUCCESS,
		itemListInfo,
    notification
	}
}

function editItemListFailure(error){
	return {
		type: EDIT_ITEMLIST_FAILURE,
		error
	}
}

export function editItemList(itemListInfo, token){
	return function(dispatch){
		return fetch(`api/boards/${itemListInfo.boardId}/itemlists/${itemListInfo._id}`, {
			method: 'PUT',
			headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
			body: JSON.stringify(itemListInfo)
		}).then((response)=>{
      if (response.status >= 400) {
        throw new Error(EDIT_ITEMLIST_ERROR)
      }
      return response.json()
    }).then((data)=>{
			dispatch(editItemListSuccess(itemListInfo, EDIT_ITEMLIST_MESSAGE))
		}).catch((err)=>{
			dispatch(editItemListFailure(err.message))
		})
	}
}

export const RESTORE_ARCHIVED_ITEMLIST = 'RESTORE_ARCHIVED_ITEMLIST'
export function restoreItemList(itemListInfo){
  return {
    type: RESTORE_ARCHIVED_ITEMLIST,
    itemListInfo
  }
}

export const ARCHIVE_ITEMLIST_SUCCESS = 'ARCHIVE_ITEMLIST_SUCCESS'
export const ARCHIVE_ITEMLIST_FAILURE = 'ARCHIVE_ITEMLIST_FAILURE'
export const ARCHIVE_ITEMLIST_ERROR = 'An error has occured while archiving this list'

function archiveItemListSuccess(itemListId){
  return {
    type: ARCHIVE_ITEMLIST_SUCCESS,
    itemListId
  }
}

function archiveItemListFailure(error){
  return {
    type: ARCHIVE_ITEMLIST_FAILURE,
    error
  }
}

export function archiveItemList(itemListInfo, token){
	itemListInfo.archived = true
  return function(dispatch){
		return fetch(`api/boards/${itemListInfo.boardId}/itemlists/${itemListInfo._id}`, {
			method: 'PUT',
			headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
			body: JSON.stringify(itemListInfo)
		}).then((response)=>{
      if (response.status >= 400) {
        throw new Error(ARCHIVE_ITEMLIST_ERROR)
      }
      return response.json()
    }).then((data)=>{
			dispatch(archiveItemListSuccess(itemListInfo._id))
		}).catch((err)=>{
			dispatch(archiveItemListFailure(err.message))
		})
	}
}

