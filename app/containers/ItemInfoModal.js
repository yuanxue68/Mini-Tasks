import React, {Component} from 'react'
import {buildDateText, getCookie} from './../utils/Utils'
import {connect} from 'react-redux'
import Dialog from 'material-ui/lib/dialog'
import FlatButton from 'material-ui/lib/flat-button'
import RaisedButton from 'material-ui/lib/raised-button'
import {openPopover} from './../actions/PopoverActions'
import {openModal, closeModal} from './../actions/ModalActions'
import FontIcon from 'material-ui/lib/font-icon'
import ItemInfoForm from './../components/ItemInfoForm'
import LabelPopover from './../containers/LabelPopover'
import MembersPopover from './../containers/MembersPopover'
import Labels from './../components/labels'

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
            onTouchTap={this.handleClose}
          />,
        ];
    const itemInfo = this.props.itemInfo || {}
    var initial = {
      initialValues:  Object.assign({}, itemInfo)
    }
    delete initial.initialValues.dueDate
    const dateText = itemInfo.dueDate? buildDateText(new Date(itemInfo.dueDate)): '' 
    return(
      <div>
	
        <Dialog
          title="Item Details"
          actions={actions}
          modal={false}
          open={this.props.modals.itemInfo}
          onRequestClose={this.handleClose}
          autoDetectWindowHeight={false}
          autoScrollBodyContent={true}
        >
          <div className="col-md-9">
            <FlatButton 
              label={"Due On: "+dateText}  
              icon={<FontIcon className="fa fa-times" />}
              labelPosition="before"
            />
            <ItemInfoForm {...initial}/>
            <Labels labels={["yellow", "red"]}/>
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
            <LabelPopover/>
            <RaisedButton style={sideButtonStyle} label="Archive"/> 
            <RaisedButton style={sideButtonStyle} label="Delete"/>
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
