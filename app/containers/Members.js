import React, {Component} from 'react'
import {connect} from 'react-redux'
import MemberPage from './../components/MemberPage'
import {getMembers, createMember, deleteMember} from './../actions/MemberActions'
import {getCookie} from './../utils/Utils'
class Members extends Component {
	constructor(props){
		super(props)
	}

	componentDidMount(){
		const {dispatch} = this.props
		var token = getCookie('yulloToken')
		dispatch(getMembers(this.props.router.params.boardId, token))
	}
	
	render(){
		var token = getCookie('yulloToken')
    const { dispatch } = this.props
		return (
			<div className="container">
				<MemberPage {...this.props} 
				onDeleteMember={(boardId, userId)=>dispatch(deleteMember(boardId,userId, token))}
				onCreateMember={(boardId, userId)=>dispatch(createMember(boardId,userId, token))}/>
			</div>
		)
	}
}

function mapStateToProps (state) {
  return {
  	authentication: state.authentication,
  	router: state.router,
  	members: state.members
  }
}

export default connect(mapStateToProps)(Members)
