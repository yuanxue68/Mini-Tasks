import React, {Component} from 'react'
import {reduxForm} from 'redux-form'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import FontIcon from 'material-ui/lib/font-icon'

const validate = (values) => {
  const errors = {}
  if(!values.username) {
    errors.username = 'Required'
  }
  if(!values.password) {
    errors.password = 'Required'
  }
  return errors
}

class LoginForm extends Component {
  render() {
    const {fields: {username, password}, errors, login} = this.props 
    return (
      <form onSubmit={login}>
        <h3>Login</h3>
        <TextField
          {...username}
          fullWidth={true}
          errorText = {errors.username}
          hintText="User Name"
          floatingLabelText="User Name"
          type="text"
        /><br/>
        <TextField
          {...password}
          fullWidth={true}
          hintText="Password"
          floatingLabelText="Password"
          errorText={errors.password}
          type="password"
        /><br/>
        <RaisedButton 
          label="Log in" 
          icon={<FontIcon className="fa fa-paper-plane-o"/>}
          type="submit"
        />
      </form>
    )
  }
}

LoginForm = reduxForm({ 
  form: 'login',                           
  fields: ['username', 'password'],
  validate
})(LoginForm)

export default LoginForm
