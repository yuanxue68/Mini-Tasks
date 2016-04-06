import React, {Component} from 'react'
import {getCookie} from './../utils/Utils'
import {connect} from 'react-redux'
import {editboard} from './../actions/BoardActions'
import BoardCreationForm from './../components/BoardCreationForm'
import FlatButton from 'material-ui/lib/flat-button'
import RaisedButton from 'material-ui/lib/raised-button'
import {openPopover, closePopover} from './../actions/PopoverActions'
import FontIcon from 'material-ui/lib/font-icon'
import Popover from 'material-ui/lib/popover/popover';
import PopoverAnimationFromTop from 'material-ui/lib/popover/popover-animation-from-top';

const styles = {
  popover: {
    padding: 20
  }
};

export default class EditBoardPopover extends Component{

	constructor(props){
		super(props)
		this.editBoard= this.editBoard.bind(this)
	  this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleOpen(event) {
    const {dispatch} = this.props
    dispatch(openPopover("editBoard", event.currentTarget))
  }

  handleClose(){
    const {dispatch} = this.props
    dispatch(closePopover("editBoard"))
  }

	editBoard(){
    const {dispatch, form} = this.props
		var name = form.boardCreation.name.value
		var description = form.boardCreation.description && form.boardCreation.description.value
		if((!name)){
			return
		}
    var boardInfo = JSON.parse(JSON.stringify(this.props.boardInfo))//deep copy
    boardInfo.name = name
    boardInfo.description = description
    
    var token = getCookie('yulloToken')
		dispatch(editboard(boardInfo, token))
    this.handleClose()
	}

	render(){
    const {boardInfo, popovers} = this.props
    const initial = {
      initialValues: boardInfo,
    };
    return(
      <div>
        <FlatButton 
          label={boardInfo.name}
          onTouchTap={this.handleOpen}
          icon={<FontIcon className="fa fa-clipboard" />}
        />

        <Popover
          open={popovers.editBoard.open}
          onRequestClose={this.handleClose}
          anchorEl={popovers.editBoard.anchor}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          animation={PopoverAnimationFromTop}
        >
          <div style={styles.popover}>
            <BoardCreationForm {...initial}/>
            <RaisedButton 
              label="Save" 
              onTouchTap={this.editBoard}
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
    authentication: state.authentication
  }
}

export default connect(mapStateToProps)(EditBoardPopover)
