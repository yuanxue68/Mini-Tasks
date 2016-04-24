import React, {Component} from 'react'
import {getCookie} from './../utils/Utils'
import {connect} from 'react-redux'
import {createItem} from './../actions/ItemActions'
import ItemCreationForm from './../components/ItemCreationForm'
import FlatButton from 'material-ui/lib/flat-button'
import {openPopover, closePopover} from './../actions/PopoverActions'
import RaisedButton from 'material-ui/lib/raised-button'
import FontIcon from 'material-ui/lib/font-icon'
import Popover from 'material-ui/lib/popover/popover';
import PopoverAnimationFromTop from 'material-ui/lib/popover/popover-animation-from-top';
import isEqual from 'lodash/isEqual'

const styles = {
  popover: {
    padding: 20
  }
}

class ItemCreationPopover extends Component{
	constructor(props){
		super(props)
		this.createItem = this.createItem.bind(this)
	  this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    var suffix = this.props.index || ""
    this.id = 'itemForm'+suffix
  }

  handleOpen(event) {
    event.stopPropagation()
    event.preventDefault()
    const {dispatch} = this.props
    dispatch(openPopover(this.id, event.currentTarget))
  }

  handleClose(){
    const {dispatch} = this.props
    dispatch(closePopover(this.id))
  }

	createItem(){
    const {dispatch, form, itemListId, boardId} = this.props
		var name= form.itemCreation.name.value
    if((!name)){
			return
		}
		var item ={
			name,
      itemListId,
      boardId
		}
    var token = getCookie('yulloToken')
		dispatch(createItem(item, token))
    this.handleClose()
	}

  shouldComponentUpdate(nextProps, nextState){
    return !isEqual(this.props, nextProps)
  }

	render(){
    const {popovers, edit} = this.props
    const initial = {
      initialValues: this.props.item || {}
    }
    return(
      <div>
        <FlatButton label="New Item" 
          onTouchTap={this.handleOpen}
          icon={<FontIcon className="fa fa-plus"/>}    
        />
	
        <Popover
          title="New Item"
          modal={false}
          open={popovers[this.id] && popovers[this.id].open}
          anchorEl={popovers[this.id] && popovers[this.id].anchor}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleClose}
          autoDetectWindowHeight={false}
        >
          <div style={styles.popover}>
            <ItemCreationForm {...initial}/>
            <RaisedButton 
              label="Save" 
              onTouchTap={this.createItem}
            />
          </div>

        </Popover>
      </div>
    )
	}


}

function mapStateToProps (state) {
  return {
    popovers: state.popovers,
    form: state.form,
  }
}

export default connect(mapStateToProps)(ItemCreationPopover)
