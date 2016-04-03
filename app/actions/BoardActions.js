import {getHost, getCookie} from './../utils/Utils'

export const GET_BOARD_SUCCESS = 'GET_BOARD_SUCCESS'
export const GET_BOARD_FAILURE = 'GET_BOARD_FAILURE'

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
        throw new Error(response.statusText)
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

export function editboard(boardInfo){
	return function(dispatch){
		return fetch('api/boards/'+boardInfo._id, {
			method: 'PUT',
			headers: {
        "Authorization": "Bearer " + getCookie("yulloToken"),
        "Content-Type": "application/json"
      },
			body: JSON.stringify(boardInfo)
		}).then((response)=>{
			if(response.status >= 400){
        throw new Error(response.statusText)
      }
      return response.json()
		}).then((boardInfo)=>{
      dispatch(editBoardSuccess(boardInfo, "Board Infomration Saved Sucessfully"))
    }).catch((err)=>{
			dispatch(editBoardFailure(err.errorMessage))
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
