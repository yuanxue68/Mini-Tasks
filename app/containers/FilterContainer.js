import React, {Component} from 'react'
import FlatButton from 'material-ui/lib/flat-button'
import {connect} from 'react-redux'
import FontIcon from 'material-ui/lib/font-icon'
import {Link} from 'react-router'
import LabelFilter from './../components/LabelFilter'
import TextField from 'material-ui/lib/text-field'
import DatePicker from 'material-ui/lib/date-picker/date-picker'
import {addColorFilter, changeNameFilter, changeDateFilter} from './../actions/FilterActions'

class FilterContainer extends Component {
  constructor(props){
    super(props)
      this.onNameChange = this.onNameChange.bind(this)
      this.onDateChange = this.onDateChange.bind(this)
      this.onAddColorFilter = this.onAddColorFilter.bind(this)
  }

  onNameChange(){
    const {dispatch} = this.props
    const name = this.refs.nameSearch.getValue()
    dispatch(changeNameFilter(name))
  }

  onDateChange(){
  }

  onAddColorFilter(){
  }

  render(){
    const {boardInfo} = this.props
    
    return(
      <div>
        <h4><i className="fa fa-filter"></i> Filter Items</h4>
        <FlatButton label="Back" 
          linkButton={true}
          containerElement={<Link to={`/board/${boardInfo._id}`}/>}
          icon={<FontIcon className="fa fa-angle-left" />}
        />
        <h4>Filter By Name</h4>
        <TextField
          ref="nameSearch"
          hintText="Item Name"
          onChange={this.onNameChange}
        /><br/>
        <h4>Filter By DueDate</h4>
        <DatePicker hintText="Due Before" />    
        <LabelFilter/>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    boardInfo: state.boardInfo
  }
}

export default connect(mapStateToProps)(FilterContainer)
