import React, {Component} from 'react'
import {connect} from 'react-redux'
import { userSignIn, createErrorMessage } from './../actions/RootActions'
import LoginForm from './../components/LoginForm'

class Login extends Component {
	constructor(props){
		super(props)
	}
	
	render(){
		const {dispatch} = this.props
		return (
			<div className="container">
				<LoginForm onUserSignIn={ (userInfo)=>dispatch(userSignIn(userInfo)) }/>
			</div>
		)
	}
}

function mapStateToProps (state) {
  return {
  }
}

export default connect(mapStateToProps)(Login)