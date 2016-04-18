import React, {Component} from 'react'
import {getCookie} from './../utils/Utils'
import {connect} from 'react-redux'
import {createBoard} from './../actions/BoardListActions'
import BoardCreationForm from './../components/BoardCreationForm'
import Dialog from 'material-ui/lib/dialog'
import FlatButton from 'material-ui/lib/flat-button'
import {openModal, closeModal} from './../actions/ModalActions'
import FontIcon from 'material-ui/lib/font-icon'

export default class BoardCreationModal extends Component{
	constructor(props){
		super(props)
		this.createBoard= this.createBoard.bind(this)
	  this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleOpen() {
    const {dispatch} = this.props
    dispatch(openModal("boardCreation"))
  }

  handleClose(){
    const {dispatch} = this.props
    dispatch(closeModal("boardCreation"))
  }

	createBoard(){
    const {dispatch, form, authentication} = this.props
		var name = form.boardCreation.name && form.boardCreation.name.value
		var description = form.boardCreation.description && form.boardCreation.description.value
		if((!name)){
			return
		}
		var board ={
			name,
			description,
			owner: authentication.userInfo._id
		}
    var token = getCookie('yulloToken')
		dispatch(createBoard(board, token))
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
        <FlatButton label="New Board" 
          onTouchTap={this.handleOpen}
          icon={<FontIcon className="fa fa-tachometer"/>}    
        />
	
        <Dialog
          title="Create New Board"
          actions={actions}
          modal={false}
          open={this.props.modals.boardCreation}
          onRequestClose={this.handleClose}
          autoDetectWindowHeight={false}
        >
          <BoardCreationForm/>

        </Dialog>
      </div>
    )
	}


}

function mapStateToProps (state) {
  return {
    modals: state.modals,
    form: state.form,
    authentication: state.authentication
  }
}

export default connect(mapStateToProps)(BoardCreationModal)
