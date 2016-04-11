import React, {Component} from 'React'
import {connect} from 'react-redux'
import Popover from 'material-ui/lib/popover/popover'
import UserCard from './../components/UserCard'
import Avatar from 'material-ui/lib/avatar'
import {getInitial, getCookie} from './../utils/Utils'
import {openPopover, closePopover} from './../actions/PopoverActions'
import {deleteMember} from './../actions/MemberActions'

class UserPopover extends Component {
  constructor(props){
    super(props)
    this.handleClose = this.handleClose.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.onDeleteMember = this.onDeleteMember.bind(this)
    this.id = 'userCard'+this.props.user._id
  }

  handleOpen(event){
    event.stopPropagation()
    event.preventDefault()
    const {dispatch} = this.props
    const anchor = document.getElementById('currentMember') 
    dispatch(openPopover(this.id, anchor))
  }

  handleClose(){
    const {dispatch} = this.props
    dispatch(closePopover(this.id))
  }

  onDeleteMember(userId){
    const {dispatch, boardInfo} = this.props
    const token = getCookie('yulloToken')
    dispatch(deleteMember(boardInfo._id, userId, token))
    ths.handleClose()
  }

  render(){
    const {popovers, user, boardInfo} = this.props
    return(
      <div style={{display:'inline-block'}} onClick={this.handleOpen}>
        <Avatar style={{margin:1}}>
          {getInitial(user.name)}
        </Avatar>
        <Popover open={popovers[this.id] && popovers[this.id].open}
          anchorEl={popovers[this.id] && popovers[this.id].anchor}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleClose} 
        >      
          <UserCard user={user} boardInfo={boardInfo} onDeleteMember={this.onDeleteMember}/>
        </Popover>
      </div>
    )
  } 
}

function mapStateToProps(state) {
  return {
    popovers: state.popovers,
    boardInfo: state.boardInfo
  }
}

export default connect(mapStateToProps)(UserPopover)
