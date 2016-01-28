import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {getCookie} from './../utils/Utils'
import LoggedOutHome from './../components/LoggedOutHome'
import BoardList from './../components/BoardList'

export default class Home extends Component {
	
	render(){
		var HomePage = this.props.authentication.authed ? <BoardList/> : <LoggedOutHome/>
		return (
			<div>
				{HomePage}
			</div>
		)
	}
}

function mapStateToProps (state) {
  return {
    authentication: state.authentication
  }
}

export default connect(mapStateToProps)(Home)