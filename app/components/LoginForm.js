import React, {Component} from 'react'

export default class LoginForm extends Component {
  constructor(props){
    super(props)
    this.submitSignInForm = this.submitSignInForm.bind(this)
  }
  
  render(){
    return (
      <div className="col-md-8 col-md-offset-2">
        <h5>Sign In</h5>
        <div className="form-group">
          <label>Username</label>
          <input id="login-username" className="form-control" placeholder="Email"/>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input id="login-password" type="password" className="form-control" placeholder="Password"/>
        </div>
        <button onClick={this.submitSignInForm} className="btn btn-primary">Login</button>
      </div>
    )
  }

  submitSignInForm(){
    var username = document.getElementById("login-username").value
    var password = document.getElementById("login-password").value
    var userInfo ={
      username,
      password
    }
    this.props.onUserSignIn(userInfo)
  }
}