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
		return fetch('/api/boards/'+boardId+'/members', {
			method: 'GET',
			headers: {
        "Authorization": "Bearer " + getCookie("yulloToken")
      }
		}).then((response)=>{
      if (response.status >= 400) {
        throw new Error(response.statusText)
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
		return fetch('/api/boards/'+boardId+"/members", {
			method: 'POST',
			body: JSON.stringify(userId),
			headers: {
        "Authorization": "Bearer " + getCookie("yulloToken"),
        "Content-Type": "application/json"
      }
		}).then((reponse)=>{
      if (response >= status) {
        throw new Error(response.statusText)
      }
      return response.json()
    }).then((member)=>{
			dispatch(createMembersSuccess(member, "member added successfully "))
		}).catch((err)=>{
			dispatch(createMembersFailure(err.message))
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
		return fetch('/api/boards/'+boardId+'/members/'+userId, {
			method: 'DELETE',
			headers: {
        "Authorization": "Bearer " + getCookie("yulloToken")
      }
		}).then((response)=>{
      if (response.status >= 400) {
        throw new Error(response.statusText)
      }
      return response.json()
    }).then((data)=>{
			dispatch(deleteMemberSuccess(userId))
		}).fail((err)=>{
			dispatch(deleteMemberFailure(error.message))
		})
	}
}

