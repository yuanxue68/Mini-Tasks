import React, {Component} from 'react'
import {Link} from 'react-router'
import FlatButton from 'material-ui/lib/flat-button'
import FontIcon from 'material-ui/lib/font-icon'
import LabelFilter from './../components/LabelFilter'
import TextField from 'material-ui/lib/text-field'
import DatePicker from 'material-ui/lib/date-picker/date-picker'

class Filter extends Component {
  constructor(props){
    super(props)
    this.clear = this.clear.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
  }

  onInputChange(){ 
    const name = this.refs.nameSearch.getValue()
    this.props.onNameChange(name)
  }

  clear(){
    this.refs.dueBefore.setDate()//clear the display in date picker
    this.refs.dueAfter.setDate()
    this.props.onClearFilter()
  }

  render(){
    const {boardInfo, filter, onClearFilter, onDueBeforeChange, onDueAfterChange, onChangeColorFilter, onNameChange} = this.props
    return (
      <div>
        <h4><i className="fa fa-filter"></i> Filter Items</h4>
        <div>
          <FlatButton label="Back" 
            linkButton={true}
            containerElement={<Link to={`/board/${boardInfo._id}`}/>}
            icon={<FontIcon className="fa fa-angle-left" />}
          />
        </div>
        <div>
          <FlatButton label="Clear"
            onTouchTap={this.clear}
            icon={<FontIcon className="fa fa-refresh" />}
          />
        </div>
        <h4>Filter By Name</h4>
        <TextField
          ref="nameSearch"
          hintText="Item Name"
          value={filter.name}
          onChange={this.onInputChange}
        /><br/>
        <h4>Filter By DueDate</h4>
        <DatePicker ref="dueAfter" onChange={onDueAfterChange} hintText="Due After" />    
        <DatePicker ref="dueBefore" onChange={onDueBeforeChange} hintText="Due Before" />    
        <LabelFilter onChangeColorFilter={onChangeColorFilter} filter={filter}/>
      </div>
    )
  }
}

export default Filter
