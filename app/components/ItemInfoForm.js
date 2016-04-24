import React, {Component} from 'react'
import {reduxForm} from 'redux-form'
import TextField from 'material-ui/lib/text-field'

const validate = (values) => {
  const errors = {}
  if(!values.name) {
    errors.name = 'Required'
  }
  return errors
}
class ItemInfoForm extends Component {
  render() {
    const {fields: {name, description, dueDate}, errors, handleSubmit} = this.props 
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
        <TextField
          {...description}
          fullWidth={true}
          hintText="Item Description"
          floatingLabelText="Item Description"
          multiLine={true}
          rows={2}
          type="text"
        /><br/>
        <br/>
      </form>
    )
  }
}

ItemInfoForm = reduxForm({ 
  form: 'itemInfo',                           
  fields: ['name', 'description', 'dueDate'],
  validate
})(ItemInfoForm)

export default ItemInfoForm
