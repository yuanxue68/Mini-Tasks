import React, {Component} from 'react'
import {reduxForm} from 'redux-form'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'

const validate = (values) => {
  const errors = {}
  if(!values.name) {
    errors.name = 'Required'
  }

  if(values.password != values.password_confirmation) {
    errors.password_confirmation = 'Password does not match password confirmation'
  }

  if(values.password && values.password.length < 6){
    errors.password = 'Password must be 6+ characters long'
  }

  return errors
}

class UserSettingForm extends Component {
  render() {
    const {fields: {name, description, password, password_confirmation}} = this.props
    const {errors, onEditUser, userInfo} = this.props

    var passwordField, passwordConfirmationField
    if(!userInfo.facebook){
      passwordField = <div>
            <TextField
              {...password}
              style = {{width:'70%'}}
              errorText = {errors.password}
              hintText = "Leave blank if no change"
              floatingLabelText = "leave blank if no change"
              type="password"
            /><br/>
          </div>

      passwordConfirmationField = <div>
            <TextField
              {...password_confirmation}
              style = {{width:'70%'}}
              errorText = {errors.password_confirmation}
              hintText = "Leave blank if no change"
              floatingLabelText = "leave blank if no change"
              type="password"
            /><br/>
          </div>

    }
    return (
      <div>
        <h3>User Setting</h3>
        <form onSubmit={onEditUser}>
          <TextField
            {...name}
            style = {{width:'70%'}}
            errorText = {errors.name}
            hintText = "Display Name"
            floatingLabelText = "Display Name"
            type = "text"
          /><br/>
          <TextField
            {...description}
            style = {{width:'70%'}}
            hintText = "Describe Yourself"
            floatingLabelText = "Description"
            type = "text"
          /><br/>
           {passwordField}
          {passwordConfirmationField}
        </form>
        <RaisedButton label="Save" onTouchTap={onEditUser} />
      </div>
    )
  }
}

UserSettingForm = reduxForm({
  form: 'userSetting',
  fields: ['name', 'description', 'password', 'password_confirmation'], 
  validate
})(UserSettingForm)

export default UserSettingForm
