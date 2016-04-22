import React, {Component} from 'react'
import Avatar from 'material-ui/lib/avatar'
import Card from 'material-ui/lib/card/card'
import CardHeader from 'material-ui/lib/card/card-header'
import CardText from 'material-ui/lib/card/card-text'
import CardActions from 'material-ui/lib/card/card-actions'
import FlatButton from 'material-ui/lib/flat-button'
import {getInitial} from './../utils/Utils'

export default class Comments extends Component {
  render(){
    const {comment, userId, onDeleteComment} = this.props
    const deleteButton = userId === comment.owner._id ? 
        <CardActions>
          <FlatButton 
            label={<span><i className="fa fa-trash"></i> Delete</span>} 
            onTouchTap={onDeleteComment.bind(null, comment._id)} 
          />
        </CardActions> : null
    return(
      <Card>
        <CardHeader
          avatar={<Avatar>{getInitial(comment.owner.name)}</Avatar>}
          title={comment.owner.name}
          subtitle={<i className="fa fa-comment-o"></i>}
        />
        <CardText style={{whiteSpace:'pre-line'}}>
          {comment.content}
        </CardText>
        {deleteButton}
      </Card>
    )
  }
}
