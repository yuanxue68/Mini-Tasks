import {getHost} from './../utils/Utils'

export const SEARCH_USERS_SUCCESS = 'SEARCH_USERS_SUCCESS'
export const SEARCH_USERS_FAILURE = 'SEARCH_USERS_FAILURE'
export const SEARCH_USERS_ERROR = 'An error has occured while searching for users'

function searchUserSuccess(users){
  return {
    type: SEARCH_USERS_SUCCESS,
    users
  }
}

function searchUserFailure(error){
  return {
    type: SEARCH_USERS_FAILURE,
    error
  }
}

export function searchUsers(searchParam, token){
  return function(dispatch){
    return fetch(`${getHost()}/api/users?searchParam=${searchParam}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((response)=>{
      if(response.status >= 400){
        throw new Error(SEARCH_USERS_ERROR)
      }
      return response.json()
    }).then((users)=>{
      dispatch(searchUserSuccess(users))
    }).catch((err)=>{
      dispatch(searchUserFailure(err.message))
    })
  }
}

export const CLEAR_USER_SEARCH = 'CLEAR_USER_SEARCH'

export function clearUserSearch(){
  return{
    type: CLEAR_USER_SEARCH
  }
}

export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS'
export const EDIT_USER_FAILURE = 'EDIT_USER_FAILURE'
export const EDIT_USER_ERROR = 'An error has occured while editing user'
export const EDIT_USER_MESSAGE = 'User setting saved successfully'

export function editUserSuccess(userInfo, notification){
  return {
    type: EDIT_USER_SUCCESS,
    userInfo,
    notification
  }
}

export function editUserFailure(error){
  return {
    type: EDIT_USER_FAILURE,
    error
  }
}

export function editUser(userInfo, token){
  return function(dispatch){
    return fetch(`${getHost()}/api/users/${userInfo._id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userInfo)
    }).then((response)=>{
      if(response.status >= 400){
        throw new Error(EDIT_USER_ERROR)     
      }
      return response.json()
    }).then((result)=>{
      dispatch(editUserSuccess(result, EDIT_USER_MESSAGE))
    }).catch((err)=>{
      dispatch(editUserFailure(err.message))
    })
  }
}
