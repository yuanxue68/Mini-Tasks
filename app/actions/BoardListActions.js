import {urlBuilder, getCookie} from './../utils/Utils'

export const GET_BOARDS_SUCCESS = 'GET_BOARDS_SUCCESS'
export const GET_BOARDS_FAILURE = 'GET_BOARDS_FAILURE'

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

export function getBoards(owner){
	return function(dispatch){
		return fetch(urlBuilder('/api/boards', owner), {
			method: 'GET',
			headers: {
        "Authorization": "Bearer " + getCookie("yulloToken"),
        "Content-Type": "application/json"
      }
		}).then((response)=>{
      if (response.status >= 400){
        throw new Error(response.statusText)
      }
      return response.json()
    }).then((boardList)=>{
			dispatch(getBoardsSuccess(boardList))
		}).catch((err)=>{
			dispatch(getBoardsFailure(err.errorMessage))
		})
	}
}

export const CREATE_BOARD_SUCCESS = 'CREATE_BOARD_SUCCESS'
export const CREATE_BOARD_FAILURE = 'CREATE_BOARD_FAILURE'

export function createBoard(boardInfo){
	return function(dispatch){
		return fetch('/api/boards', {
			method:'POST',
      headers: {
				"Authorization": "Bearer " + getCookie("yulloToken"),
				"Content-Type": "application/json"
			},
			body: JSON.stringify(boardInfo)
		}).then((response)=>{
			if(response.status >= 400) {
				throw new Error(response.statusText)
			}
			return response.json()
		}).then((boardInfo)=>{
			dispatch(createBoardSucess(boardInfo))
		}).catch((err)=>{
			dispatch(createBoardFailure(err.errorMessage))
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

export function deleteBoard(boardId){
	return function(dispatch){
		return fetch('/api/boards/'+boardId, {
			method: 'DELETE',
      headers: {"Authorization": "Bearer " + getCookie("yulloToken")}
		}).then((response)=>{
			if (response.status >= 400){
				throw new Error(response.statusText)
			}
			return response.json()
		}).then(()=>{
			dispatch(deleBoardSuccess(boardId))
		}).catch((err)=>{
			dispatch(deleteBoardFailure(err.errorMessage))
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
