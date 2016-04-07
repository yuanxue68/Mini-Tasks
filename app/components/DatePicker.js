import React, {Component} from 'react'
import DatePicker from 'material-ui/lib/date-picker/date-picker'

class DatePickerWrapper extends Component {
  onChange(evt, date) {
    if (this.props.onChange) {
      this.props.onChange(date);
    }
  }
  render() {
    return <DatePicker 
      {...this.props} 
      onChange={this.onChange.bind(this)}/>
  }
}

export default DatePickerWrapper
