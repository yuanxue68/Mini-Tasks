import * as ActionTypes from './../actions/ItemActions'

export default function itemInfo (state = {labels:[]}, action){
	const {type} = action
	switch (type){
		case ActionTypes.POPULATE_ITEM_SUCCESS:
			return action.itemInfo
    case ActionTypes.REMOVE_LABEL:
      var index = state.labels.indexOf(action.label)
      return Object.assign({}, state, {
        labels: [
          ...state.labels.slice(0,index),
          ...state.labels.slice(index+1)
        ]
      })
    case ActionTypes.ADD_LABEL:
      if(state.labels.includes(action.label)){
        return state
      } else {
        return Object.assign({}, state, {
          labels: [...state.labels, action.label]
        })
      }
    case ActionTypes.REMOVE_DUEDATE:
      return Object.assign({}, state, {
        dueDate: null
      })
    case ActionTypes.ADD_DUEDATE:
      return Object.assign({}, state, {
        dueDate: action.dueDate
      })
    default:
			return state
	}
}
