import React, {Component} from 'react'
import {connect} from 'react-redux'
import {closePopover} from './../actions/PopoverActions'
import Popover from 'material-ui/lib/popover/popover'
import PopoverAnimationFromTop from 'material-ui/lib/popover/popover-animation-from-top'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import {getColorList} from './../utils/Utils' 

const styles = {
  popover: {
    padding: 20
  }
}

const colorList = getColorList()


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
    const {popovers, onAddLabel} = this.props
    var listItems = colorList.map((color, index)=>{
      return <ListItem 
        style={{backgroundColor:color}}
        key={index}
        onTouchTap={onAddLabel.bind(null, color)}
        />
    })
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
            {listItems}
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
