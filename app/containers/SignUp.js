import React, {Component} from 'react'
import {connect} from 'react-redux'
import SignUpForm from './../components/SignUpForm'
import { userSignUp, createErrorMessage } from './../actions/RootActions'

class SignUp extends Component {
	constructor(props){
		super(props)
	}
	
	render(){
		const { dispatch } = this.props
		return (
			<div className="container">
				<SignUpForm onSignUp={(userInfo)=> dispatch(userSignUp(userInfo))} 
					onCreateError={(error)=> dispatch(createErrorMessage(error))} />
			</div>
		)
	}
}

function mapStateToProps (state) {
  return {
  }
}

export default connect(mapStateToProps)(SignUp)