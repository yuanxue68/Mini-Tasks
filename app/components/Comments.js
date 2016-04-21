import React, {Component} from 'react'
import Comment from './Comment'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'

export default class Comments extends Component {
  render(){
    const {comments} = this.props
    const commentsComp = comments.map((comment)=>{
      return <Comment comment={comment}/>
    })
    return(
      <div>
        <h4>
          Comments
        </h4>
        <div>
          {commentsComp}
        </div><br/>
        <div>
          <h4>New Comment</h4>
          <TextField rows={2} rowsMax={4} fullWidth={true}/>
          <RaisedButton label="Post Comment" />
        </div>
      </div>
    )
  }
}
