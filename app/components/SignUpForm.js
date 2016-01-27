import React, {Component} from 'react'

export default class SignUpForm extends Component {
	constructor(props){
		super(props)
		this.submitSignUpForm = this.submitSignUpForm.bind(this)
	}
	
	render(){
		return (
			<div className="col-md-8 col-md-offset-2">
				<h5>Sign Up</h5>
				<div className="form-group">
          <label>Username *</label>
          <input id="sign-up-username" type="text" className="form-control"  placeholder="Username"/>
        </div>
        <div className="form-group">
          <label>Password *</label>
          <input id="sign-up-password" type="password" className="form-control"  placeholder="Password"/>
        </div>
        <div className="form-group">
          <label>Password Confirmation *</label>
          <input id="sign-up-password-conf" type="password" className="form-control" placeholder="Repeat Password"/>
        </div>
        <div className="form-group">
          <label>Display Name *</label>
          <input id="sign-up-display-name" type="text" className="form-control" placeholder="Display Name"/>
        </div>
        <div className="form-group">
          <label>Describe Yourself</label>
          <textarea id="sign-up-description" type="text" rows="3" className="form-control" placeholder="Tell the world about yourself"/>
        </div>
        <button onClick={this.submitSignUpForm} className="btn btn-primary">Sign Up</button>
			</div>
		)
	}

	submitSignUpForm(){
		console.log("here")
		var username = document.getElementById("sign-up-username").value
		if(!username){
			this.props.onCreateError("Username can not be empty")
			return
		}
		var password = document.getElementById("sign-up-password").value
		if(!username){
			this.props.onCreateError("Password can not be empty")
			return
		}
		var displayName = document.getElementById("sign-up-display-name").value
		if(!displayName){
			this.props.onCreateError("Display name can not be empty")
			return
		}
		var passwordConfirmation = document.getElementById("sign-up-password-conf").value
		if(password !== passwordConfirmation){
			console.log(password)
			console.log(passwordConfirmation)
			this.props.onCreateError("Password doesn not match")
			return
		}
		var description = document.getElementById("sign-up-description").value
		var userInfo={
			local:{
				username,
				password
			},
			name: displayName,
			description
		}
		this.props.onSignUp(userInfo)
	}

}