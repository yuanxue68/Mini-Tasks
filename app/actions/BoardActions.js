import {getCookie} from './../utils/Utils'

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

export function getBoard(boardId){
	return function(dispatch){
		return $.ajax({
			url: '/api/boards/'+boardId,
			method: 'GET',
			headers: {"Authorization": "Bearer " + getCookie("yulloToken")}
		}).done((boardInfo)=>{
			dispatch(getBoardSuccess(boardInfo))
		}).fail((xhr, status, err)=>{
			dispatch(getBoardFailure(xhr.responseText))
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
		return $.ajax({
			url: 'api/boards/'+boardInfo._id,
			method: 'PUT',
			headers: {"Authorization": "Bearer " + getCookie("yulloToken")},
			contentType: "application/json",
			data: JSON.stringify(boardInfo)
		}).done((data)=>{
			dispatch(editBoardSuccess(boardInfo, "Board Infomration Saved Sucessfully"))
		}).fail((xhr, status, err)=>{
			dispatch(editBoardFailure(xhr.responseText))
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