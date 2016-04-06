import * as ActionTypes from './../actions/PopoverActions'

export default function popovers (state = {
    editBoard: {
      open:false,
      anchor: null
    },
    listForm: {
      open: false,
      anchor: null
    }
  }, action){
	
  const {type} = action
	switch (type){
		case ActionTypes.OPEN_POPOVER:
			return Object.assign({}, state, {
        [action.popover.name]: {
          open: true,
          anchor: action.popover.anchor
        } 
      })
      break;
		case ActionTypes.CLOSE_POPOVER:
			return Object.assign({}, state, {
        [action.popover.name]: {
          open: false,
          anchor: null
        }
      })
      break;
		default:
			return state
	}
}
