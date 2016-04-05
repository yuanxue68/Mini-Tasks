import {pushState} from 'redux-router'
import {getCookie, deleteCookie, getHost} from './../utils/Utils'

export const CREATE_ERROR_MESSAGE = 'CREATE_ERROR_MESSAGE'
export const CREATE_NOTIFICATION_MESSAGE = 'CREATE_NOTIFICATION_MESSAGE'
export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'
export const RESET_NOTIFICATION_MESSAGE = 'RESET_NOTIFICATION_MESSAGE'

export function createErrorMessage(error){
  return {
    type: CREATE_ERROR_MESSAGE,
    error
  }
}

export function createNotificationMessage(notification){
  return {
    type: CREATE_NOTIFICATION_MESSAGE,
    notification
  }
}

export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE
  }
}

export function resetNotificationMessage() {
  return {
    type: RESET_NOTIFICATION_MESSAGE
  }
}

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
export const SIGN_UP_FAILURE   = 'SIGN_UP_FAILURE'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_ERROR = 'An error has occured while signing up'

function signUpRequest (){
  return {
    type: SIGN_UP_REQUEST
  }
}

function signUpFailure(error){
  return {
    type: SIGN_UP_FAILURE,
    error
  }
}

function signUpSuccess(userInfo){
  return {
    type: SIGN_UP_SUCCESS,
    userInfo
  }
}

export function userSignUp(userInfo){
  return function(dispatch){
    return fetch(`${getHost()}/api/users/`, {
      method:'POST', 
      headers:{
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin', 
      body: JSON.stringify(userInfo)
    }).then((response)=>{
      if(response.status >= 400){
        throw new Error(SIGN_UP_ERROR)
      }
      return response.json() 
    }).then((data) => {
      Promise.all([
        dispatch(signInSuccess(data)),
        dispatch(pushState(null,"/",""))
      ])
    }).catch((err) => {
      dispatch(signUpFailure(err.message))
    })

  }
}

export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST'
export const SIGN_IN_FAILURE = 'SIGN_UP_FAILURE'
export const SIGN_IN_ERROR = 'An error has occured while signing in'

function signInRequest (){
  return {
    type: SIGN_IN_REQUEST
  }
}

function signInFailure(error){
  return {
    type: SIGN_IN_FAILURE,
    error
  }
}

function signInSuccess(userInfo){
  return {
    type: SIGN_IN_SUCCESS,
    userInfo
  }
}

export function userSignIn(userInfo, token, showFail = true){
  return function(dispatch){

    return fetch(`${getHost()}/api/auth/local`, {
      method:'POST',
      credentials: 'same-origin',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userInfo)
    }).then((response)=>{
      if(response.status >= 400){
        throw new Error(SIGN_IN_ERROR)
      }
      return response.json()
    }).then((data) => {
      Promise.all([
        dispatch(signInSuccess(data)),
        dispatch(pushState(null,"/",""))
      ])
    }).catch((err) => {
      if(showFail){
        dispatch(signInFailure(err.message))
      } else { 
        dispatch(pushState(null,"/",""))
      }
    })
  }
}

export const SIGN_OUT='SIGN_OUT'

function signOutRequest(){
  return{
    type: SIGN_OUT
  }
}

export function userSignOut(){
  return function(dispatch){
    deleteCookie("yulloToken")
    return Promise.all([
        dispatch(signOutRequest()),
        dispatch(pushState(null,"/",""))
      ])
  }
}
