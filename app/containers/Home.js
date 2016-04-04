import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import LoggedOutHome from './../components/LoggedOutHome'
import BoardList from './../components/BoardList'
import {createBoard, deleteBoard, editBoard, getBoards} from './../actions/BoardListActions'
import {getCookie} from './../utils/Utils'

export default class Home extends Component {
	
	render(){
		var HomePage
    var token = this.props.authentication.token
		const {dispatch} = this.props
		if(this.props.authentication.authed){
			HomePage = <BoardList
			boardList={this.props.boardList}
			authentication={this.props.authentication}
			onGetBoards={(owner)=>dispatch(getBoards(owner, token))}
			onEditBoard={(boardInfo)=>dispatch(editBoard(boardInfo))}
			onDeleteBoard={(boardId, e)=>{e.preventDefault(); dispatch(deleteBoard(boardId, token))}}
			onCreateBoard={(boardInfo)=>dispatch(createBoard(boardInfo, token))}/>
		} else {
			HomePage = <LoggedOutHome/>
		}
			
		return (
			<div>
				{HomePage}
			</div>
		)
	}
}

function mapStateToProps (state) {
  return {
    authentication: state.authentication,
    boardList: state.boardList
  }
}

export default connect(mapStateToProps)(Home)
