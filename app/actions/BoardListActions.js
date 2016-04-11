import {getHost, urlBuilder} from './../utils/Utils'
import {pushState} from 'redux-router'

export const GET_BOARDS_SUCCESS = 'GET_BOARDS_SUCCESS'
export const GET_BOARDS_FAILURE = 'GET_BOARDS_FAILURE'
export const GET_BOARDS_ERROR = "Failed get board list"

function getBoardsSuccess(boardList){
	return {
		type: GET_BOARDS_SUCCESS,
		boardList
	}
}

function getBoardsFailure(error){
	return {
		type: GET_BOARDS_FAILURE,
		error
	}
}

export function getBoards(owner, token){
	return function(dispatch){
		return fetch(urlBuilder(`${getHost()}/api/boards`, owner), {
			method: 'GET',
			headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
		}).then((response)=>{
      if (response.status >= 400){
        throw new Error(GET_BOARDS_ERROR)
      }
      return response.json()
    }).then((boardList)=>{
			dispatch(getBoardsSuccess(boardList))
		}).catch((err)=>{
			dispatch(getBoardsFailure(err.message))
		})
	}
}

export const CREATE_BOARD_SUCCESS = 'CREATE_BOARD_SUCCESS'
export const CREATE_BOARD_FAILURE = 'CREATE_BOARD_FAILURE'
export const CREATE_BOARD_ERROR = 'Failed to create a board'

export function createBoard(boardInfo, token){
	return function(dispatch){
		return fetch(`${getHost()}/api/boards`, {
			method:'POST',
      headers: {
				"Authorization": `Bearer ${token}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify(boardInfo)
		}).then((response)=>{
			if(response.status >= 400) {
				throw new Error(CREATE_BOARD_ERROR)
			}
			return response.json()
		}).then((boardInfo)=>{
			dispatch(createBoardSucess(boardInfo))
		}).catch((err)=>{
			dispatch(createBoardFailure(err.message))
		})
	}
}

function createBoardSucess(boardInfo){
	return {
		type: CREATE_BOARD_SUCCESS,
		boardInfo
	}
}

function createBoardFailure(error){
	return {
		type: CREATE_BOARD_FAILURE,
		error
	}
}

export const DELETE_BOARD_SUCCESS = 'DELETE_BOARD_SUCCESS'
export const DELETE_BOARD_FAILURE = 'DELETE_BOARD_FAILURE'
export const DELETE_BOARD_ERROR = 'An error has occured while deleting this board'

export function deleteBoard(boardId, token){
	return function(dispatch){
		return fetch(`${getHost()}/api/boards/${boardId}`, {
			method: 'DELETE',
      headers: {"Authorization": `Bearer ${token}`}
		}).then((response)=>{
			if (response.status >= 400){
				throw new Error(DELETE_BOARD_ERROR)
			}
			return response.json()
		}).then(()=>{
			Promise.all([
        dispatch(deleBoardSuccess(boardId)),
        dispatch(pushState(null,"/",""))
      ])
		}).catch((err)=>{
			dispatch(deleteBoardFailure(err.message))
		})
	}
}

function deleBoardSuccess(boardId){
	return {
		type: DELETE_BOARD_SUCCESS,
		boardId
	}
}

function deleteBoardFailure(error){
	return{
		type: DELETE_BOARD_FAILURE,
		error
	}
}
