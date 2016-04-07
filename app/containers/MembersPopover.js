import React, {Component} from 'react'
import {connect} from 'react-redux'
import {closePopover} from './../actions/PopoverActions'
import Popover from 'material-ui/lib/popover/popover';
import PopoverAnimationFromTop from 'material-ui/lib/popover/popover-animation-from-top';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

const styles = {
  popover: {
    padding: 20
  }
}

class MembersPopover extends Component{
	constructor(props){
		super(props)
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose(){
    const {dispatch} = this.props
    dispatch(closePopover('members'))
  }
	render(){
    const {popovers} = this.props
    return(
        <Popover
          title="Pick A Label"
          modal={false}
          open={popovers.members.open}
          anchorEl={popovers.members.anchor}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleClose}
          autoDetectWindowHeight={false}
        >
          <List>
            <ListItem  label='Member1' />
            <ListItem  label='Member2' />
          </List>  
        </Popover>
    )
	}


}

function mapStateToProps (state) {
  return {
    popovers: state.popovers,
  }
}

export default connect(mapStateToProps)(MembersPopover)
