import {getCookie} from './../utils/Utils'

export const GET_MEMBERS_SUCCESS = 'GET_MEMBERS_SUCCESS'
export const GET_MEMBERS_FAILURE = 'GET_MEMBERS_FAILURE'

function getMembersSuccess(members){
	return {
		type: GET_MEMBERS_SUCCESS,
		members
	}
}

function getMembersFailure(error){
	return {
		type: GET_MEMBERS_FAILURE,
		error
	}
}

export function getMembers(boardId){
	return function(dispatch){
		return $.ajax({
			url: '/api/boards/'+boardId+"/members",
			method: 'GET',
			headers: {"Authorization": "Bearer " + getCookie("yulloToken")}
		}).done((members)=>{
			dispatch(getMembersSuccess(members))
		}).fail((xhr, status, err)=>{
			dispatch(getMembersFailure(xhr.responseText))
		})
	}
}


export const CREATE_MEMBERS_SUCCESS = 'CREATE_MEMBERS_SUCCESS'
export const CREATE_MEMBERS_FAILURE = 'CREATE_MEMBERS_FAILURE'

function createMembersSuccess(member, notification){
	return {
		type: CREATE_MEMBERS_SUCCESS,
		member,
		notification
	}
}

function createMembersFailure(error){
	return {
		type: CREATE_MEMBERS_FAILURE,
		error
	}
}

export function createMember(boardId, userId){
	return function(dispatch){
		return $.ajax({
			url: '/api/boards/'+boardId+"/members",
			method: 'POST',
			contentType:'application/json',
			data: JSON.stringify(userId),
			headers: {"Authorization": "Bearer " + getCookie("yulloToken")}
		}).done((member)=>{
			dispatch(createMembersSuccess(member, "member added successfully "))
		}).fail((xhr, status, err)=>{
			dispatch(createMembersFailure(xhr.responseText))
		})
	}
}

export const DELETE_MEMBER_SUCCESS = 'DELETE_MEMBER_SUCCESS'
export const DELETE_MEMBER_FAILURE = 'DELETE_MEMBER_FAILURE'

function deleteMemberSuccess(userId){
	return {
		type: DELETE_MEMBER_SUCCESS,
		userId
	}
}

function deleteMemberFailure(error){
	return {
		type: DELETE_MEMBER_FAILURE,
		error
	}
}

export function deleteMember(boardId, userId){
	return function(dispatch){
		return $.ajax({
			url: '/api/boards/'+boardId+"/members/"+userId,
			method: 'DELETE',
			headers: {"Authorization": "Bearer " + getCookie("yulloToken")}
		}).done((data)=>{
			dispatch(deleteMemberSuccess(userId))
		}).fail((xhr, status, err)=>{
			dispatch(deleteMemberFailure(xhr.responseText))
		})
	}
}

