import React, {Component} from 'react'
import {connect} from 'react-redux'
import { userSignIn, createErrorMessage } from './../actions/RootActions'
import LoginForm from './../components/LoginForm'

class Login extends Component {
	constructor(props){
		super(props)
    this.userSignIn = this.userSignIn.bind(this)
	}
	
	userSignIn(event){
    event.preventDefault()
    const {dispatch, form} = this.props
    if(!(form.login.username.value && form.login.password.value )){
      return 
    }
    const userInfo = {
      username: form.login.username.value,
      password: form.login.password.value
    }
    dispatch(userSignIn(userInfo))
  }

  render(){
		return (
			<div className="container">
				<LoginForm login={this.userSignIn}/>
			</div>
		)
	}
}

function mapStateToProps (state) {
  return {
    form: state.form
  }
}

export default connect(mapStateToProps)(Login)
