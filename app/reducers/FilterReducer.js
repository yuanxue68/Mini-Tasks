import * as ActionTypes from './../actions/FilterActions'

export default function filter(state = {
    name: null,
    dueBefore: null,
    dueAfter: null,
    colors:[]
  }, action) {
  const {type} = action
  switch (type) {
    case ActionTypes.ADD_COLOR_FILTER:
      return Object.assign({}, state, {
        colors: [...state.colors, action.color]
      })
    case ActionTypes.REMOVE_COLOR_FILTER:
      const index = state.colors.indexOf(action.color)
      return Object.assign({}, state, {
        colors: [
          ...state.colors.slice(0, index),
          ...state.colors.slice(index+1)
        ]
      })
    case ActionTypes.CHANGE_NAME_FILTER:
      return Object.assign({}, state, {
        name: action.name
      })
    case ActionTypes.CHANGE_DUE_BEFORE_FILTER:
      return Object.assign({}, state, {
        dueBefore: action.date
      })
    case ActionTypes.CHANGE_DUE_AFTER_FILTER:
      return Object.assign({}, state, {
        dueAfter: action.date
      })
    case ActionTypes.CLEAR_FILTER:
      return Object.assign({}, state, {
        name: null,
        dueBefore: null,
        dueAfter: null,
        colors: []
      })
    default:
      return state
  }
}
