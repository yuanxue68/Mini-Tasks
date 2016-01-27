import React, {Component} from 'react'

export default class LoginForm extends Component {
  constructor(props){
    super(props)
  }
  
  render(){
    return (
      <div className="col-md-8 col-md-offset-2">
        <h5>Sign In</h5>
        <div className="form-group">
          <label>Username</label>
          <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email"/>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </div>
    )
  }
}