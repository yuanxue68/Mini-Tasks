import React, {Component} from 'react'
import {getCookie} from './../utils/Utils'
import {connect} from 'react-redux'
import {createItemList, editItemList, deleteItemList} from './../actions/ItemListActions'
import ListCreationForm from './../components/ListCreationForm'
import FlatButton from 'material-ui/lib/flat-button'
import {openPopover, closePopover} from './../actions/PopoverActions'
import RaisedButton from 'material-ui/lib/raised-button'
import FontIcon from 'material-ui/lib/font-icon'
import Popover from 'material-ui/lib/popover/popover';
import PopoverAnimationFromTop from 'material-ui/lib/popover/popover-animation-from-top';
import Colors from 'material-ui/lib/styles/colors'
import isEqual from 'lodash/isEqual'

const styles = {
  popover: {
    padding: 20,
  }
}

class ListCreationModal extends Component{
	constructor(props){
		super(props)
		this.createList = this.createList.bind(this)
	  this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.editList = this.editList.bind(this)
    this.deleteList = this.deleteList.bind(this)
    var suffix = this.props.index || ""
    this.id = 'listForm'+suffix
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

	createList(){
    const {dispatch, form, router} = this.props
		var name= form.listCreation.name.value
    var boardId = router.params.boardId
    if((!name)){
			return
		}
		var itemList ={
			name,
			boardId
		}
    var token = getCookie('yulloToken')
		dispatch(createItemList(itemList, boardId, token))
    this.handleClose()
	}

  editList(){
    const {dispatch, itemList, form} = this.props
    itemList.name = form.listCreation.name.value
    const token = getCookie('yulloToken')
    dispatch(editItemList(itemList, token))
    this.handleClose()
  }

  deleteList(){
    const {dispatch, itemList} = this.props
    const token = getCookie('yulloToken')
    dispatch(deleteItemList(itemList._id, itemList.boardId, token))
    this.handleClose()
  }

  shouldComponentUpdate(nextProps, nextState){
    return !isEqual(this.props, nextProps)
  }

	render(){
    const {popovers, edit} = this.props
    const title = (this.props.itemList && this.props.itemList.name) || "New List"
    const saveHandler = edit ? this.editList : this.createList
    const deleteButton = edit ? <RaisedButton 
              label="delete"
              onTouchTap={this.deleteList}
              backgroundColor={Colors.red500}
              primary={true}
            /> : null

    const initial = {
      initialValues: this.props.itemList || {}
    }
    return(
      <div>
        <FlatButton label={title} 
          onTouchTap={this.handleOpen}
          icon={<FontIcon className="fa fa-list-alt"/>}    
        />
	
        <Popover
          title="Create New List"
          modal={false}
          open={popovers[this.id] && popovers[this.id].open}
          anchorEl={popovers[this.id] && popovers[this.id].anchor}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleClose}
          autoDetectWindowHeight={false}
        >
          <div style={styles.popover}>
            <ListCreationForm {...initial}/>
            <RaisedButton 
              label="Save" 
              onTouchTap={saveHandler}
              secondary={true}
            />
            {deleteButton}
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
    authentication: state.authentication,
    router: state.router
  }
}

export default connect(mapStateToProps)(ListCreationModal)
