import * as ItemListActionTypes from './../actions/ItemListActions'
import * as BoardListActionTypes from './../actions/BoardListActions'

export default function loadingStatus (state = {
  loadingBoards: false,
  loadingItemlists: false,
  loadingComments: false,
  loadingArchived: false
}, action){
  const {type} = action
  switch(type){
    case BoardListActionTypes.GET_BOARDS_REQUEST: 
      return Object.assign({}, state, {
        loadingBoards: true
      })
    case ItemListActionTypes.GET_ITEMLISTS_REQUEST:
      return Object.assign({}, state, {
        loadingItemlists: true
      })
    case "comment":
      return Object.assign({}, state, {
        loadingComments: true
      })
    case ItemListActionTypes.GET_ARCHIVED_ITEMLISTS_REQUEST:
      return Object.assign({}, state, {
        loadingArchived: true
      })
    case BoardListActionTypes.GET_BOARDS_SUCCESS:
    case BoardListActionTypes.GET_BOARDS_FAILURE:
      return Object.assign({}, state, {
        loadingBoards: false
      })
    case ItemListActionTypes.GET_ITEMLISTS_SUCCESS:
    case ItemListActionTypes.GET_ITEMLISTS_FAILURE:
      return Object.assign({}, state, {
        loadingItemlists: false
      })
    case 'comment':
      return Object.assign({}, state, {
        loadingComments: false
      })
    case ItemListActionTypes.GET_ARCHIVED_ITEMLISTS_SUCCESS:
    case ItemListActionTypes.GET_ARCHIVED_ITEMLISTS_FAILURE:
      return Object.assign({}, state, {
        loadingArchived: false
      })
    default:
      return state
  }
}
