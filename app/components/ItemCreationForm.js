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
class ItemCreationForm extends Component {
  render() {
    const {fields: {name}, errors, handleSubmit} = this.props
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          {...name}
          fullWidth={true}
          errorText = {errors.name}
          hintText="Item Name"
          floatingLabelText="Item Name"
          type="text"
        /><br/>
      </form>
    )
  }
}

ItemCreationForm = reduxForm({ 
  form: 'itemCreation',                           
  fields: ['name'],
  validate
})(ItemCreationForm)

export default ItemCreationForm;
