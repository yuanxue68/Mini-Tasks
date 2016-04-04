import {getHost} from './../utils/Utils'


export const POPULATE_ITEM_SUCCESS = 'POPULATE_ITEM_SUCCESS'


export function populateItemToModal(itemInfo){
	return {
		type: POPULATE_ITEM_SUCCESS,
		itemInfo
	}
}


export const CREATE_ITEM_SUCCESS = 'CREATE_ITEM_SUCCESS'
export const CREATE_ITEM_FAILURE = 'CREATE_ITEM_FAILURE'
export const CREATE_ITEM_ERROR = 'Failed to create item'

export function createItem(item, token){
	return function(dispatch){
		return fetch(`${getHost()}/api/items`,{
			method: 'POST',
			body: JSON.stringify(item),
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
		}).then((response)=>{
      if (response.status >= 400){
        throw new Error(CREATE_ITEM_ERROR)
      }
      return response.json()
    }).then((item)=>{
			dispatch(createItemSuccess(item))
		}).catch((err)=>{
			dispatch(createItemFailure(err.message))
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
export const DELETE_ITEM_ERROR = "An error has occured while deleting this item"

export function deleteItem(itemId, itemListId, token){
	return function(dispatch){
		return fetch(`${getHost()}/api/items/${itemId}`, {
			method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${token}`
      }
		}).then((response)=>{
      if (response.status >= 400){
        throw new Error(DELETE_ITEM_ERROR)
      }
      return response.json()
    }).then(()=>{
			dispatch(deleteItemSuccess(itemId, itemListId))
		}).catch((err)=>{
			dispatch(deleteItemFailure(err.message))
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
		return fetch('api/items/'+itemInfo._id, {
			method: 'PUT',
			headers: {
        "Authorization": "Bearer " + getCookie("yulloToken"),
        "Content-Type": "application/json"
      },
			body: JSON.stringify(itemInfo)
		}).then((response)=>{
      if (response.status >= 400) {
        throw new Error(response.statusText)
      }
      return response.json()
    }).then((data)=>{
			dispatch(editItemSuccess(itemInfo))
		}).catch((err)=>{
			dispatch(editItemFailure(err.errorMessage))
		})
	}
}
