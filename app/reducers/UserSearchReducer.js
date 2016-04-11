import * as ActionTypes from './../actions/UserActions'

export default function userSearch (state=[], action){
  const {type} = action

    switch(type){
      case ActionTypes.SEARCH_USERS_SUCCESS:
        return action.users
      case ActionTypes.SIGN_UP_FAILURE:
        return []
      case ActionTypes.CLEAR_USER_SEARCH:
        return []
      default:
        return state
    }
}
