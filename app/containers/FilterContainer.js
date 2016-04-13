import React, {Component} from 'react'
import {connect} from 'react-redux'
import {clearFilter, addColorFilter, removeColorFilter, changeNameFilter, changeDueAfterFilter, changeDueBeforeFilter} from './../actions/FilterActions'
import Filter from './../components/Filter'

class FilterContainer extends Component {
  constructor(props){
    super(props)
      this.onNameChange = this.onNameChange.bind(this)
      this.onDueBeforeChange = this.onDueBeforeChange.bind(this)
      this.onDueAfterChange = this.onDueAfterChange.bind(this)
      this.onChangeColorFilter = this.onChangeColorFilter.bind(this)
      this.onClearFilter = this.onClearFilter.bind(this)
  }

  onNameChange(name){
    const {dispatch} = this.props
    dispatch(changeNameFilter(name))
  }

  onDueBeforeChange(event, date){
    const {dispatch} = this.props
    dispatch(changeDueBeforeFilter(date.toString()))
  }

  onDueAfterChange(event, date){
    const {dispatch} = this.props
    dispatch(changeDueAfterFilter(date.toString()))
  }

  onChangeColorFilter(color){
    const {dispatch, filter} = this.props
    if(filter.colors.includes(color)){
      dispatch(removeColorFilter(color))
    } else {
      dispatch(addColorFilter(color))
    }

  }

  onClearFilter(){
    const {dispatch} = this.props
    dispatch(clearFilter())
  }

  render(){
    const {boardInfo, filter} = this.props
    return <Filter 
            onChangeColorFilter={this.onChangeColorFilter}
            onDueBeforeChange={this.onDueBeforeChange}
            onDueAfterChange={this.onDueAfterChange}
            onNameChange={this.onNameChange}
            onClearFilter={this.onClearFilter}
            filter={filter}
            boardInfo={boardInfo}
            />
  }
}

function mapStateToProps(state){
  return {
    boardInfo: state.boardInfo,
    filter: state.filter
  }
}

export default connect(mapStateToProps)(FilterContainer)
