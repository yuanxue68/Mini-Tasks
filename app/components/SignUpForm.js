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
  if(values.passwordConfirmation != values.password){
    errors.passwordConfirmation = 'Does not match password'
  }
  if(!values.displayName){
    errors.displayName = 'Required'
  }
  return errors
}

class SignUpForm extends Component {
  render() {
    const {fields: {username, password, passwordConfirmation, displayName, description}, errors, signUp} = this.props 
    return (
      <form onSubmit={signUp}>
        <h3>Sign Up</h3>
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
        <TextField
          {...passwordConfirmation}
          fullWidth={true}
          hintText="Password Confirmation"
          floatingLabelText="Password Confirmation"
          errorText={errors.passwordConfirmation}
          type="password"
        /><br/>
         <TextField
          {...displayName}
          fullWidth={true}
          hintText="Display Name"
          floatingLabelText="Display Name"
          errorText={errors.displayName}
          type="text"
        /><br/>
         <TextField
          {...description}
          fullWidth={true}
          hintText="Describe Yourself"
          floatingLabelText="Describe Yourself"
          multiLine={true}
          type="text"
        /><br/>
        <RaisedButton 
          label="Sign Up" 
          icon={<FontIcon className="fa fa-rocket"/>}
          type="submit"
        />
      </form>
    )
  }
}

SignUpForm = reduxForm({ 
  form: 'signUp',                           
  fields: ['username', 'password', 'passwordConfirmation', 'displayName', 'description'],
  validate
})(SignUpForm)

export default SignUpForm
