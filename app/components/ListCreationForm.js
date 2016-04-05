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
class ListCreationForm extends Component {
  render() {
    const {fields: {name}, errors, handleSubmit} = this.props
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          {...name}
          fullWidth={true}
          errorText = {errors.name}
          hintText="List Name"
          floatingLabelText="List Name"
          type="text"
        /><br/>
      </form>
    )
  }
}

ListCreationForm = reduxForm({ 
  form: 'listCreation',                           
  fields: ['name'],
  validate
})(ListCreationForm)

export default ListCreationForm;
