import {getHost} from './../utils/Utils'

export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS'
export const CREATE_COMMENT_FAILURE = 'CREATE_COMMENT_FAILURE'
export const CREATE_COMMENT_ERROR = 'an error has occured while posting comment'

function createCommentSuccess(comment){
  return {
    type: CREATE_COMMENT_SUCCESS,
    comment
  }
}

function createCommentFailure(error){
  return {
    type: CREATE_COMMENT_FAILURE,
    error
  }
}

export function createComment(comment, token){
  return function(dispatch){
    return fetch(`${getHost()}/api/items/${comment.itemId}/comments`, {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }).then((response)=>{
      if(response.status >= 400){
        throw new Error(CREATE_COMMENT_ERROR)
      }
      return response.json()
    }).then((comment)=>{
      dispatch(createCommentSuccess(comment))
    }).catch((err)=>{
      dispatch(createCommentFailure(err.message))
    })
  }
}

export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS'
export const GET_COMMENTS_FAILURE = 'GET_COMMENTS_FAILURE'
export const GET_COMMENTS_REQUEST = 'GET_COMMENTS_REQUEST'
export const GET_COMMENTS_ERROR = 'GET_COMMENTS_ERROR'

function getCommentsSuccess(comments){
  return {
    type: GET_COMMENTS_SUCCESS,
    comments
  }
}

function getCommentsFailure(error){
  return {
    type: GET_COMMENTS_FAILURE,
    error
  }
}

function getCommentRequest(){
  return {
    type: GET_COMMENTS_REQUEST
  }
}

export function getComments(itemId, token){
  return function(dispatch){
    dispatch(getCommentRequest())
    return fetch(`${getHost()}/api/items/${itemId}/comments`, {
      method:'GET',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((response)=>{
      if(response.status >= 400){
        throw new Error(GET_COMMENTS_ERROR)
      }
      return response.json()
    }).then((comments)=>{
      dispatch(getCommentsSuccess(comments))
    }).catch((err)=>{
      dispatch(getCommentsFailure(err.message))
    })
  }
}

export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS'
export const DELETE_COMMENT_FAILURE = 'DELETE_COMMENT_FAILURE'
export const DELETE_COMMENT_ERROR = 'DELETE_COMMENT_ERROR'

function deleteCommentSuccess(commentId){
  return {
    type: DELETE_COMMENT_SUCCESS,
    commentId
  }
}

function deleteCommentFailure(error){
  return {
    type: DELETE_COMMENT_FAILURE,
    error
  }
}

export function deleteComment(itemId, commentId, token){
  return function (dispatch){
    return fetch(`${getHost()}/api/items/${itemId}/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response)=>{
      if(response.status >= 400){
        throw new Error(DELETE_COMMENT_ERROR)
      }
      response.json()
    }).then(()=>{
      dispatch(deleteCommentSuccess(commentId))
    }).catch((err)=>{
      dispatch(deleteCommentFailure(err.message))
    })
  }
}
