import {getHost} from './../utils/Utils'

export const GET_MEMBERS_SUCCESS = 'GET_MEMBERS_SUCCESS'
export const GET_MEMBERS_FAILURE = 'GET_MEMBERS_FAILURE'
export const GET_MEMBERS_ERROR = 'An error has occured while getting board members'
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

export function getMembers(boardId, token){
	return function(dispatch){
		return fetch(`${getHost()}/api/boards/${boardId}/members`, {
			method: 'GET',
			headers: {
        "Authorization": `Bearer ${token}`
      }
		}).then((response)=>{
      if (response.status >= 400) {
        throw new Error(GET_MEMBERS_ERROR)
      }
      return response.json()
    }).then((members)=>{
			dispatch(getMembersSuccess(members))
		}).catch((err)=>{
			dispatch(getMembersFailure(err.message))
		})
	}
}


export const CREATE_MEMBERS_SUCCESS = 'CREATE_MEMBERS_SUCCESS'
export const CREATE_MEMBERS_FAILURE = 'CREATE_MEMBERS_FAILURE'
export const CREATE_MEMBERS_ERROR = 'An error has occured while creating this membership'
export const CREATE_MEMBERS_MESSAGE = 'Member added successfully'

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

export function createMember(boardId, userId, token){
	return function(dispatch){
		return fetch(`${getHost()}/api/boards/${boardId}/members`, {
			method: 'POST',
			body: JSON.stringify({userId}),
			headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
		}).then((response)=>{
      if (response.status >= 400) {
        throw new Error(CREATE_MEMBERS_ERROR)
      }
      return response.json()
    }).then((member)=>{
			dispatch(createMembersSuccess(member, CREATE_MEMBERS_MESSAGE))
		}).catch((err)=>{
			dispatch(createMembersFailure(err.message))
		})
	}
}

export const DELETE_MEMBER_SUCCESS = 'DELETE_MEMBER_SUCCESS'
export const DELETE_MEMBER_FAILURE = 'DELETE_MEMBER_FAILURE'
export const DELETE_MEMBER_ERROR = 'An error has occured while deleting this membership'

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

export function deleteMember(boardId, userId, token){
	return function(dispatch){
		return fetch(`${getHost()}/api/boards/${boardId}/members/${userId}`, {
			method: 'DELETE',
			headers: {
        "Authorization": `Bearer ${token}`
      }
		}).then((response)=>{
      if (response.status >= 400) {
        throw new Error(DELETE_MEMBER_ERROR)
      }
      return response.json()
    }).then((data)=>{
			dispatch(deleteMemberSuccess(userId))
		}).catch((err)=>{
			dispatch(deleteMemberFailure(err.message))
		})
	}
}

