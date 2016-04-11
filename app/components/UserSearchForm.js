import React, {Component} from 'react'
import {reduxForm} from 'redux-form'
import TextField from 'material-ui/lib/text-field'
import FlatButton from 'material-ui/lib/flat-button'

class UserSearchForm extends Component {
  render(){
    const {fields: {searchParam}, onClearSearch, onSearchUsers} = this.props

    return(
      <form onSubmit={onSearchUsers}>
        <h4><i className="fa fa-user-plus"></i> Add Members</h4>
        <TextField {...searchParam} fullWidth={true} hintText="Search by ID or name"/>
        <FlatButton label="Clear" onTouchTap={onClearSearch}/>
      </form>
    )
  } 
}

UserSearchForm = reduxForm({
  form: 'userSearch',
  fields: ['searchParam']
})(UserSearchForm)

export default UserSearchForm
