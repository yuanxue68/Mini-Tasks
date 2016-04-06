import React, {Component} from 'react'
import {connect} from 'react-redux'
import LeftNav from 'material-ui/lib/left-nav'
import FlatButton from 'material-ui/lib/flat-button'
import {toggleAside} from './../actions/AsideActions'
import FontIcon from 'material-ui/lib/font-icon'

class BoardAside extends Component {
  constructor(props){
    super(props)
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle(){
    const {dispatch} = this.props 
    dispatch(toggleAside('boardAside'))    
  }

  render(){
  
    return(
      <div>
        <FlatButton
          label="Show Menu"
          onTouchTap={this.handleToggle}
          icon={<FontIcon className="fa fa-align-justify"/>}
        />
        <LeftNav open={this.props.aside.boardAside}>
        </LeftNav>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    aside: state.aside
  }
}

export default connect(mapStateToProps)(BoardAside)
