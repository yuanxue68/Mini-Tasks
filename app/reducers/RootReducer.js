
import { routerStateReducer as router } from 'redux-router'
import { combineReducers } from 'redux'
import * as ActionTypes from './../actions/RootActions'

const rootReducer = combineReducers({
	router,
	errorMessage,
	notificationMessage,
	authentication
})
export default rootReducer

function errorMessage(state = null, action) {
	const {type, error} = action
	if (type === ActionTypes.RESET_ERROR_MESSAGE) {
		return null
	} else if (error) {
		return action.error
	}
	return state
}

function notificationMessage(state = null, action) {
	const {type, notification} = action
	if (type === ActionTypes.RESET_NOTIFICATION_MESSAGE) {
		return null
	} else if (notification) {
		return action.notification
	}
	return state
}

function authed(state = {authed:false}, action) {
	const {type} = action
	switch (type) {
		case ActionTypes.SIGN_UP_FAILURE:
			return Object.assign({}, state, {
				authed:false,
				userID:null
			})
		case ActionTypes.SIGN_UP_SUCCESS:
			return Object.assign({},state, {
				authed:true,
				userID:action.token.userID
			})
		case ActionTypes.SIGN_IN_SUCCESS:
			return Object.assign({}, state, {
				authed:true,
				userID:action.token.userID
			})
		case ActionTypes.SIGN_IN_FAILURE:
			return Object.assign({}, state, {
				authed:false,
				userID:null
			})
		case ActionTypes.SIGN_OUT:
			return Object.assign({}, state, {
				authed:false,
				userID:null
			})
		default:
			return state
	}
}