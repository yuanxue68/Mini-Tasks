import * as ActionTypes from './../actions/FilterActions'

export default function filter(state = {name:null, date:null, colors:[]}, action) {
  const {type} = action
  switch (type) {
    case ActionTypes.ADD_COLOR_FILTER:
      return Object.assign({}, state, {
        colors: [...state.colors, action.color]
      })
    case ActionTypes.CHANGE_NAME_FILTER:
      return Object.assign({}, state, {
        name: action.name
      })
    case ActionTypes.CHANGE_DATE_FILTER:
      return Object.assign({}, state, {
        date: action.date
      })
    default:
      return state
  }
}
