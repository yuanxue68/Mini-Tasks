import {getHost} from './../utils/Utils'

export const ADD_ASSIGNER = 'ADD_ASSIGNER'
export function addAssigner(user){
  return {
    type: ADD_ASSIGNER,
    user
  }
}

export const REMOVE_ASSIGNER = 'REMOVE_ASSIGNER'
export function removeAssigner(){
  return {
    type: REMOVE_ASSIGNER
  }
}

export const ADD_LABEL = 'ADD_LABEL'
export function addLabel(label){
  return {
    type: ADD_LABEL,
    label
  }
}

export const REMOVE_LABEL = 'REMOVE_LABEL'
export function removeLabel(label){
  return {
    type: REMOVE_LABEL,
    label
  }
}

export const ADD_DUEDATE = 'ADD_DUEDATE'
export function addDueDate(dueDate){
  return {
    type: ADD_DUEDATE,
    dueDate
  }
}

export const REMOVE_DUEDATE = 'REMOVE_DUEDATE'
export function removeDueDate(){
  return {
    type:REMOVE_DUEDATE
  }
}

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
export const EDIT_ITEM_ERROR = 'EDIT_ITEM_ERROR'

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

export function editItem(itemInfo, token){
	return function(dispatch){
		var body = Object.assign({}, itemInfo)
    body.assigner = (body.assigner && body.assigner._id) || null
    return fetch(`api/items/${itemInfo._id}`, {
			method: 'PUT',
			headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
			body: JSON.stringify(body)
		}).then((response)=>{
      if (response.status >= 400) {
        throw new Error(EDIT_ITEM_ERROR)
      }
      return response.json()
    }).then((data)=>{
			dispatch(editItemSuccess(itemInfo))
		}).catch((err)=>{
			dispatch(editItemFailure(err.message))
		})
	}
}
