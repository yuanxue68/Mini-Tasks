import React, {Component} from 'react'
import Comment from './Comment'
import CommentForm from './CommentForm'
import CircularProgress from 'material-ui/lib/circular-progress'

export default class Comments extends Component {
  render(){
    const {userId, comments, loadingStatus, onCreateComment, onDeleteComment} = this.props
    var commentsComp
    if( !loadingStatus.loadingComments ){
      commentsComp = comments.map((comment)=>{
        return <Comment 
                key={comment._id} 
                userId={userId} 
                comment={comment}
                onDeleteComment={onDeleteComment}
              />
      })
    } else {
      commentsComp = <CircularProgress/>
    }
    return(
      <div>
        <h4>
          Comments
        </h4>
        <div>
          {commentsComp}
        </div><br/>
        <CommentForm onCreateComment={onCreateComment}/>
      </div>
    )
  }
}
