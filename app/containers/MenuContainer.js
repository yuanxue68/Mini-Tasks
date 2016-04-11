import React, {Component} from 'react'
import {connect} from 'react-redux'
import BoardMenu from './../components/BoardMenu'
import {searchUsers, clearUserSearch} from './../actions/UserActions'
import {getCookie} from './../utils/Utils'
import {createMember} from './../actions/MemberActions'

class MenuContainer extends Component {
  constructor(props){
    super(props)
    this.onSearchUsers = this.onSearchUsers.bind(this)
    this.onClearSearch = this.onClearSearch.bind(this)
    this.onCreateMember = this.onCreateMember.bind(this)
  }

  onCreateMember(user){
    const {dispatch, boardInfo} = this.props
    const token = getCookie('yulloToken')
    dispatch(createMember(boardInfo._id, user._id, token ))
  }

  onClearSearch(){
    const {dispatch} = this.props
    dispatch(clearUserSearch())
  }

  onSearchUsers(event){
    event.preventDefault()
    const token = getCookie('yulloToken')
    const {dispatch, form} = this.props
    const searchParam = form.userSearch.searchParam.value
    dispatch(searchUsers(searchParam, token))
  }

  render(){
    return <BoardMenu
              onCreateMember={this.onCreateMember} 
              onClearSearch={this.onClearSearch}
              onSearchUsers={this.onSearchUsers}
              {...this.props}/>
  }
}

function mapStateToProps(state){
  return {
    boardInfo: state.boardInfo,
    form: state.form,
    userSearchResult: state.userSearchResult,
    members: state.members
  }
}

export default connect(mapStateToProps)(MenuContainer)
