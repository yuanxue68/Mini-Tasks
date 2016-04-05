import React, {Component} from 'react'
import {reduxForm} from 'redux-form'
import { TextField } from 'material-ui'

const validate = (values) => {
  const errors = {}
  if(!values.name) {
    errors.name = 'Required'
  }
  return errors
}
class BoardCreationForm extends Component {
  render() {
    const {fields: {name, description}, errors, handleSubmit} = this.props
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          {...name}
          fullWidth={true}
          errorText = {errors.name}
          hintText="Board Name"
          floatingLabelText="Board Name"
          type="text"
        /><br/>
        <TextField
          {...description}
          fullWidth={true}
          hintText="Board Description"
          floatingLabelText="Board Description"
          type=""
        /><br/>
      </form>
    )
  }
}

BoardCreationForm = reduxForm({ 
  form: 'boardCreation',                           
  fields: ['name', 'description'],
  validate
})(BoardCreationForm)

export default BoardCreationForm;
