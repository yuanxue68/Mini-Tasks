import * as ActionTypes from './../actions/CommentActions'

export default function comments(state = [], action) {
  const {type} = action
  switch (type){
    case ActionTypes.GET_COMMENTS_SUCCESS:
      return action.comments
    case ActionTypes.CREATE_COMMENT_SUCCESS:
      return [...state, action.comment]
    case ActionTypes.DELETE_COMMENT_SUCCESS:
      var newState = []
      state.forEach((comment)=>{
        if(comment._id !== action.commentId){
          newState.push(comment)
        }
      })
      return newState
    default:
      return state
  }
}
