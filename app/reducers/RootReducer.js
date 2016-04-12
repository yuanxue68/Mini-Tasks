import { routerStateReducer as router } from 'redux-router'
import { combineReducers } from 'redux'
import * as ActionTypes from './../actions/RootActions'
import boardList from './../reducers/BoardListReducer'
import itemLists from './../reducers/ItemListReducer'
import boardInfo from './../reducers/BoardReducer'
import itemInfo from './../reducers/ItemInfoReducer'
import members from './../reducers/MemberReducer'
import modals from './../reducers/ModalReducer'
import popovers from './../reducers/PopoverReducer'
import aside from './../reducers/AsideReducer'
import filter from './../reducers/FilterReducer'
import userSearchResult from './../reducers/UserSearchReducer'
import {reducer as formReducer} from 'redux-form'
import { getCookie } from './../utils/Utils'

const rootReducer = combineReducers({
	router,
	errorMessage,
	notificationMessage,
	authentication,
	boardList,
	boardInfo,
	itemLists,
	itemInfo,
	members,
  form: formReducer,
  modals,
  popovers,
  aside,
  userSearchResult,
  filter
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

function authentication(state = {authed:false, userInfo: {}, token:""}, action) {
	const {type} = action
	switch (type) {
		case ActionTypes.SIGN_UP_FAILURE:
			return Object.assign({}, state, {
				authed:false,
				userInfo:null,
			  token: ''
      })
		case ActionTypes.SIGN_UP_SUCCESS:
      var token = getCookie('yulloToken')
			return Object.assign({},state, {
				authed:true,
				userInfo:action.userInfo,
        token
			})
		case ActionTypes.SIGN_IN_SUCCESS:
      var token = getCookie('yulloToken')
      return Object.assign({}, state, {
				authed:true,
				userInfo:action.userInfo,
        token
			})
		case ActionTypes.SIGN_IN_FAILURE:
			return Object.assign({}, state, {
				authed:false,
				userInfo:null,
        token: ''
			})
		case ActionTypes.SIGN_OUT:
			return Object.assign({}, state, {
				authed:false,
				userInfo:null,
        token: ''
			})
		default:
			return state
	}
}
