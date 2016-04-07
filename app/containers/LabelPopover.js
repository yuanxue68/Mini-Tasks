import React, {Component} from 'react'
import {connect} from 'react-redux'
import {closePopover} from './../actions/PopoverActions'
import Popover from 'material-ui/lib/popover/popover';
import PopoverAnimationFromTop from 'material-ui/lib/popover/popover-animation-from-top';
import Colors from 'material-ui/lib/styles/colors';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

const styles = {
  popover: {
    padding: 20
  }
}

class LabelPopover extends Component{
	constructor(props){
		super(props)
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose(){
    const {dispatch} = this.props
    dispatch(closePopover('label'))
  }
	render(){
    const {popovers} = this.props
    return(
        <Popover
          title="Pick A Label"
          modal={false}
          open={popovers.label.open}
          anchorEl={popovers.label.anchor}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleClose}
          autoDetectWindowHeight={false}
        >
          <List>
            <ListItem  style={{backgroundColor:Colors.yellow500}} />
            <ListItem  style={{backgroundColor:Colors.blue500}}/>
            <ListItem  style={{backgroundColor:Colors.orange500}}/>
            <ListItem  style={{backgroundColor:Colors.red500}}/>
            <ListItem  style={{backgroundColor:Colors.indigo500}}/>
            <ListItem  style={{backgroundColor:Colors.teal500}}/>
            <ListItem  style={{backgroundColor:Colors.blueGrey500}}/>
            <ListItem  style={{backgroundColor:Colors.brown500}}/>
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

export default connect(mapStateToProps)(LabelPopover)
