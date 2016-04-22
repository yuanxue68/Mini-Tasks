import React, {Component} from 'react'
import {reduxForm} from 'redux-form'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import FontIcon from 'material-ui/lib/font-icon'

class CommentForm extends Component {

  render(){
    const {fields: {comment}, onCreateComment} = this.props
    return (
      <form onSubmit={onCreateComment}>
        <TextField
          {...comment}
          value={comment.value||''}
          fullWidth={true}
          hintText="New Comment ..."
          floatingLabelText="New Comment..."
          type="text"
          multiLine={true}
          rows={2}
        />
        <RaisedButton 
          label="Post Comment" 
          icon={<FontIcon className="fa fa-commenting-o"/>}
          type="submit"
        />

      </form>
    )
  }
}

CommentForm = reduxForm({
  form: 'commentForm',
  fields: ['comment']
})(CommentForm)

export default CommentForm
