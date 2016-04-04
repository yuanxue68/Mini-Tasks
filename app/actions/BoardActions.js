import {getHost, getCookie} from './../utils/Utils'

export const GET_BOARD_SUCCESS = 'GET_BOARD_SUCCESS'
export const GET_BOARD_FAILURE = 'GET_BOARD_FAILURE'
export const GET_BOARD_ERROR = 'An error has occured while getting board'
function getBoardSuccess(boardInfo){
	return {
		type: GET_BOARD_SUCCESS,
		boardInfo
	}
}

function getBoardFailure(error){
	return {
		type: GET_BOARD_FAILURE,
		error
	}
}

export function getBoard(boardId, token){
	return function(dispatch){
    var host = getHost()
		return fetch(`${host}/api/boards/${boardId}`, {
			method: 'GET',
			headers: {"Authorization": `Bearer ${token}` }
		}).then((response)=>{
			if(response.status >= 400){
        throw new Error(GET_BOARD_ERROR)
      }
      return response.json()
		}).then((boardInfo)=>{ 
      dispatch(getBoardSuccess(boardInfo))
    }).catch((err)=>{
      dispatch(getBoardFailure(err.message))
		})
	}
}

export const EDIT_BOARD_SUCCESS = 'EDIT_BOARD_SUCCESS'
export const EDIT_BOARD_FAILURE = 'EDIT_BOARD_FAILURE'
export const EDIT_BOARD_ERROR = 'Failed to edit the board information'
export const EDIT_BOARD_MESSAGE = 'Board information saved successfully'

function editBoardSuccess(boardInfo, notification){
	return {
		type: EDIT_BOARD_SUCCESS,
		boardInfo,
		notification
	}
}

function editBoardFailure(error){
	return {
		type: EDIT_BOARD_FAILURE,
		error
	}
}

export function editboard(boardInfo, token){
	return function(dispatch){
		return fetch(`${getHost()}/api/boards/${boardInfo._id}`, {
			method: 'PUT',
			headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
			body: JSON.stringify(boardInfo)
		}).then((response)=>{
			if(response.status >= 400){
        throw new Error(EDIT_BOARD_ERROR)
      }
      return response.json()
		}).then(()=>{
      dispatch(editBoardSuccess(boardInfo, EDIT_BOARD_MESSAGE))
    }).catch((err)=>{
			dispatch(editBoardFailure(err.message))
		})
	}
}

export const CHANGE_BOARD_INPUT = 'CHANGE_BOARD_INPUT'

export function changeBoardInput(boardInfo){
	return {
		type: CHANGE_BOARD_INPUT,
		boardInfo
	}
}
