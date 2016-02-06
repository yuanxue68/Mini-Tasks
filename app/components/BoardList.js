import React, {Component} from 'react'
import BoardCard from './BoardCard'
import BoardCreationModal from './BoardCreationModal'
import {openModal} from './../utils/Utils'

export default class Home extends Component {
	
	componentDidMount(){
		const {dispatch, onGetBoards, authentication} = this.props
		if(authentication.userInfo.facebook){
			onGetBoards({owner:authentication.userInfo.facebook.id})
		} else {
			//onGetBoards({owner:authentication.userInfo.local.username})
		}
	}

	render(){
		const {boardList, authentication, onDeleteBoard} = this.props
		var BoardList = boardList.map(function(board, index){
			return <BoardCard key={index} board={board} onDeleteBoard={onDeleteBoard}/>
		}) 
		return (
			<div className="container">
				<h3>My Boards</h3>
				<div className="clearfix" >
				    <button type="button" onClick={openModal.bind(null, "#boardCreationModal")} className="btn btn-primary pull-right">New Board</button>
				</div>
				<br/>
				<BoardCreationModal authentication={authentication} onCreateBoard={this.props.onCreateBoard}/>
				{BoardList}
			</div>
		)
	}
}