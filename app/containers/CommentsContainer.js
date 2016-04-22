import React, {Component} from 'react'
import {connect} from 'react-redux'
import Comments from './../components/Comments'
import {createComment, deleteComment} from './../actions/CommentActions'
import {getCookie} from './../utils/Utils'
import {reset} from 'redux-form'

class CommentsContainer extends Component{
  constructor(props){
    super(props)
    this.onCreateComment = this.onCreateComment.bind(this)
    this.onDeleteComment = this.onDeleteComment.bind(this)
  }

  onCreateComment(event){
    event.preventDefault()
    event.stopPropagation()
    const {dispatch, form, item, authentication} = this.props 
    const token = getCookie('yulloToken')
    const content = form.commentForm.comment && form.commentForm.comment.value
    if(!content) return
    dispatch(reset('commentForm'))
    var newComment = {
       content,
       itemId: item._id,
       owner: authentication.userInfo._id
    }
    dispatch(createComment(newComment, token))
  }
  
  onDeleteComment(commentId){
    const {dispatch, item} = this.props
    const token = getCookie('yulloToken')
    dispatch(deleteComment(item._id, commentId, token))
  }

  render(){
    const {comments, authentication, loadingStatus} = this.props
    return(
      <div style={{padding:30}}>
        <Comments 
          userId={authentication.userInfo._id}
          comments={comments}
          onCreateComment={this.onCreateComment}
          onDeleteComment={this.onDeleteComment}
          loadingStatus={loadingStatus}
        />
      </div>
    )  
  }
}

function mapStateToProps(state){
  return {
    comments: state.comments,
    form: state.form,
    authentication: state.authentication,
    loadingStatus: state.loadingStatus
  }
}

export default connect(mapStateToProps)(CommentsContainer)
