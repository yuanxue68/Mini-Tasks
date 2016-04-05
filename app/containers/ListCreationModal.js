import React, {Component} from 'react'
import {getUserId, getCookie} from './../utils/Utils'
import {connect} from 'react-redux'
import {createItemList} from './../actions/ItemListActions'
import ListCreationForm from './../components/ListCreationForm'
import Dialog from 'material-ui/lib/dialog'
import FlatButton from 'material-ui/lib/flat-button'
import RaisedButton from 'material-ui/lib/raised-button'
import {openModal, closeModal} from './../actions/ModalActions'
import FontIcon from 'material-ui/lib/font-icon'

export default class ListCreationModal extends Component{
	constructor(props){
		super(props)
		this.createBoard= this.createList.bind(this)
	  this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleOpen() {
    const {dispatch} = this.props
    dispatch(openModal("listCreation"))
  }

  handleClose(){
    const {dispatch} = this.props
    dispatch(closeModal("listCreation"))
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
            onTouchTap={this.createBoard}
          />,
        ];
    return(
      <div>
        <RaisedButton label="New List" 
          onTouchTap={this.handleOpen}
          icon={<FontIcon className="fa fa-list"/>}    
        />
	
        <Dialog
          title="Create New Board"
          actions={actions}
          modal={false}
          open={this.props.modals.listCreation}
          onRequestClose={this.handleClose}
          autoDetectWindowHeight={false}
        >
          <ListCreationForm/>
        </Dialog>
      </div>
    )
	}


}

function mapStateToProps (state) {
  return {
    modals: state.modals,
    form: state.form,
    authentication: state.authentication,
    router: state.router
  }
}

export default connect(mapStateToProps)(ListCreationModal)
