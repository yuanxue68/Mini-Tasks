import React, {Component} from 'react'
import BoardCard from './BoardCard'

export default class Home extends Component {
	
	componentDidMount(){
		const {dispatch, onGetBoards, authentication} = this.props
		if(authentication.facebook){
			onGetBoards({owner:authentication.userInfo.facebook.id})
		} else {
			onGetBoards({owner:authentication.userInfo.local.username})
		}
	}

	render(){
		const {boardList} = this.props
		var BoardList = boardList.map(function(board, index){
			return <BoardCard key={index} board={board}/>
		}) 
		return (
			<div className="container">
				{BoardList}
			</div>
		)
	}
}