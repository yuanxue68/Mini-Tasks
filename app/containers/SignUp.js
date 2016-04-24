import React, {Component} from 'react'
import {connect} from 'react-redux'
import SignUpForm from './../components/SignUpForm'
import { userSignUp } from './../actions/RootActions'

class SignUp extends Component {
	constructor(props){
		super(props)
    this.signUp = this.signUp.bind(this)
	}

  signUp(event){
    event.preventDefault()
    const {dispatch, form:{signUp:{username, password, passwordConfirmation, displayName, description}} } = this.props
    if(!username || !password || !passwordConfirmation || !displayName){
      return
    }
    const userInfo = {
      local: {
        username: username.value,
        password: password.value
      },
      name: displayName.value,
      description: description.value
    }
    dispatch(userSignUp(userInfo))
  }
	
	render(){
		const { dispatch } = this.props
		return (
			<div className="container">
				<SignUpForm signUp={this.signUp} />
			</div>
		)
	}
}

function mapStateToProps (state) {
  return {
    form: state.form
  }
}

export default connect(mapStateToProps)(SignUp)
