import {getCookie} from './../utils/Utils'

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
		return $.ajax({
			url: '/api/boards/',
			method: 'GET',
			data:owner,
			headers: {"Authorization": "Bearer " + getCookie("yulloToken")}
		}).done((boardList)=>{
			dispatch(getBoardsSuccess(boardList))
		}).fail((xhr, status, err)=>{
			dispatch(getBoardsFailure(xhr.responseText))
		})
	}
}

export const CREATE_BOARD_SUCCESS = 'CREATE_BOARD_SUCCESS'
export const CREATE_BOARD_FAILURE = 'CREATE_BOARD_FAILURE'

export function createBoard(boardInfo){
	return function(dispatch){
		return $.ajax({
			url:'/api/board',
			method:'POST',
			contentType: 'application/json',
			data: JSON.stringify(boardInfo),
      headers: {"Authorization": "Bearer " + getCookie("yulloToken")}
		}).done(()=>{
			dispatch(createBoardSucess(boardInfo))
		}).fail((xhr, status, err)=>{
			dispatch(signInFailure(xhr.responseText))
		})
	}
}

function createBoardSucess(boardInfo){
	return {
		type: CREATE_NEW_BOARD_SUCCESS,
		boardInfo
	}
}

function createBoardFailure(error){
	return {
		type: CREATE_NEW_BOARD_FAILURE,
		error
	}
}

export const DELETE_BOARD_SUCCESS = 'DELETE_BOARD_SUCCESS'
export const DELETE_BOARD_FAILURE = 'DELETE_BOARD_FAILURE'

export function deleteBoard(boardId){
	return function(dispatch){
		return $.ajax({
			url: 'api/boards/'+boardId,
			method: 'DELETE',
      headers: {"Authorization": "Bearer " + getCookie("yulloToken")}
		}).done(()=>{
			dispatch(deleBoardSuccess(boardId))
		}).fail((xhr, status, err)=>{
			dispatch(deleteBoardFailure(xhr.responseText))
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

export const EDIT_BOARD_SUCCESS = 'EDIT_BOARD_SUCCESS'
export const EDIT_BOARD_FAILURE = 'EDIT_BOARD_FAILURE'

function editBoardSuccess(boardInfo){
	return {
		type: EDIT_BOARD_SUCCESS,
		boardInfo
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
		return $.ajax({
			url: 'api/boards/'+boardInfo._id,
			method: 'PUT',
			headers: {"Authorization": "Bearer " + getCookie("yulloToken")},
			data: JSON.stringify(boardInfo)
		}).done((data)=>{
			dispatch(editBoardSuccess(boardInfo))
		}).fail((xhr, status, err)=>{
			dispatch(editBoardFailure(xhr.responseText))
		})
	}
}