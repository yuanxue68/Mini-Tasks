import React, {Component} from 'react'
import {buildDateText, getCookie} from './../utils/Utils'
import {connect} from 'react-redux'
import Dialog from 'material-ui/lib/dialog'
import FlatButton from 'material-ui/lib/flat-button'
import {removeLabel, addLabel, editItem, deleteItem} from './../actions/itemActions'
import {addDueDate, removeDueDate} from './../actions/itemActions'
import RaisedButton from 'material-ui/lib/raised-button'
import {openPopover} from './../actions/PopoverActions'
import {openModal, closeModal} from './../actions/ModalActions'
import FontIcon from 'material-ui/lib/font-icon'
import ItemInfoForm from './../components/ItemInfoForm'
import LabelPopover from './../containers/LabelPopover'
import MembersPopover from './../containers/MembersPopover'
import Labels from './../components/labels'
import DatePicker from 'material-ui/lib/date-picker/date-picker'

const sideButtonStyle = {
  margin:10,
  display: 'block'
}

export default class ItemInfoModal extends Component{
	constructor(props){
		super(props)
	  this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.openLabelPopover = this.openLabelPopover.bind(this)
    this.openMembersPopover = this.openMembersPopover.bind(this)
    this.onAddLabel = this.onAddLabel.bind(this)
    this.onRemoveLabel = this.onRemoveLabel.bind(this)
    this.onAddDueDate = this.onAddDueDate.bind(this)
    this.onRemoveDueDate = this.onRemoveDueDate.bind(this)
    this.onSaveItem = this.onSaveItem.bind(this)
    this.onDeleteItem = this.onDeleteItem.bind(this)
  }

  onSaveItem(){
    const {dispatch,form, itemInfo} = this.props
    const token = getCookie('yulloToken')
    itemInfo.name = form.itemInfo.name.value
    itemInfo.description = form.itemInfo.description.value
    dispatch(editItem(itemInfo, token))
    this.handleClose()
  }

  onDeleteItem(){
    const {dispatch, itemInfo} = this.props
    const token = getCookie('yulloToken')
    dispatch(deleteItem(itemInfo._id, itemInfo.itemListId, token))
    this.handleClose()
  }

  onAddLabel(label){
    const {dispatch} = this.props
    dispatch(addLabel(label))
  }

  onRemoveLabel(label){
    const {dispatch} = this.props 
    dispatch(removeLabel(label)) 
  }

  onAddDueDate(event, newDate){
    const {dispatch} = this.props
    dispatch(addDueDate(newDate.toString()))
  }

  onRemoveDueDate(){
    const {dispatch} = this.props
    dispatch(removeDueDate())
  }

  handleOpen() {
    const {dispatch} = this.props
    dispatch(openModal("itemInfo"))
  }

  handleClose(){
    const {dispatch} = this.props
    dispatch(closeModal("itemInfo"))
  }

  openLabelPopover(event){
    const {dispatch} = this.props
    dispatch(openPopover('label', event.currentTarget))
  }

  openMembersPopover(event){
    const {dispatch} = this.props
    dispatch(openPopover('members', event.currentTarget))
  }

  render(){
    const actions = [
          <FlatButton
            label="Cancel"
            secondary={true}
            onTouchTap={this.handleClose}
          />,
          <FlatButton
            label="Submit"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.onSaveItem}
          />,
        ];
    const {form} = this.props
    const itemInfo = this.props.itemInfo || {}
    const initial = {
      initialValues:  Object.assign({}, itemInfo)
    }
    delete initial.initialValues.dueDate
    var dueDateTag = null    
    if(itemInfo && itemInfo.dueDate){        
      const dateText = buildDateText(new Date(itemInfo.dueDate)) 
      dueDateTag = <FlatButton
              onTouchTap={this.onRemoveDueDate}
              label={"Due On: "+dateText}  
              icon={<FontIcon className="fa fa-times" />}
              labelPosition="before"
            />
    }

    return(
      <div>
	
        <Dialog
          title="Item Details"
          actions={actions}
          contentStyle={{width:'85%', maxWidth:'none'}}
          modal={false}
          open={this.props.modals.itemInfo}
          onRequestClose={this.handleClose}
          autoDetectWindowHeight={false}
          autoScrollBodyContent={true}
        >
          <div className="col-md-9">
            {dueDateTag}
            <ItemInfoForm {...initial}/>
            <DatePicker onChange={this.onAddDueDate} hintText="Change Due Date"/>
            <Labels 
              labels={itemInfo.labels}
              onRemoveLabel={this.onRemoveLabel}
            />
          </div>
          <div className="col-md-3">
            <RaisedButton style={sideButtonStyle} 
              label="Assign" 
              onTouchTap={this.openMembersPopover}
            />
            <MembersPopover/>
            <RaisedButton style={sideButtonStyle} 
              onTouchTap={this.openLabelPopover} 
              label="Label"
            />
            <LabelPopover
              onAddLabel={this.onAddLabel}
            />
            <RaisedButton 
              onTouchTap={this.onDeleteItem}
              style={sideButtonStyle}
              label="Delete"
            />
          </div>
        </Dialog>
      </div>
    )
	}


}

function mapStateToProps (state) {
  return {
    modals: state.modals,
    form: state.form,
    itemInfo: state.itemInfo
  }
}

export default connect(mapStateToProps)(ItemInfoModal)
