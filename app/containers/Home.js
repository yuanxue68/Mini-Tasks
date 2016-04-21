import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import BoardList from './../components/BoardList'
import {createBoard, deleteBoard, editBoard, getBoards} from './../actions/BoardListActions'
import {getCookie} from './../utils/Utils'
import CircularProgress from 'material-ui/lib/circular-progress'

export default class Home extends Component {
  componentDidMount(){
    const token = getCookie('yulloToken')
    const {dispatch, authentication} = this.props
    dispatch(getBoards({owner:authentication.userInfo._id}, token))
  }
	
	render(){
		var HomePage
    var token = this.props.authentication.token
		const {dispatch, loadingStatus} = this.props
    if(!loadingStatus.loadingBoards){
      HomePage = <BoardList
        boardList={this.props.boardList}
        authentication={this.props.authentication}
        onGetBoards={(owner)=>dispatch(getBoards(owner, token))}
        onEditBoard={(boardInfo)=>dispatch(editBoard(boardInfo))}
        onDeleteBoard={(boardId, e)=>{e.preventDefault(); dispatch(deleteBoard(boardId, token))}}
        onCreateBoard={(boardInfo)=>dispatch(createBoard(boardInfo, token))}
      />
    } else {
      HomePage = <div className="text-center"><CircularProgress size={4}/></div>
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
    boardList: state.boardList,
    loadingStatus: state.loadingStatus
  }
}

export default connect(mapStateToProps)(Home)
