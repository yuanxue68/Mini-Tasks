import React, {Component} from 'react'

export default class LoginForm extends Component {
  constructor(props){
    super(props)
  }
  
  render(){
    return (
      <div>
        <div className="form-group">
          <label>Username</label>
          <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email"/>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
        </div>
        <button type="submit" className="btn btn-default">Login</button>
      </div>
    )
  }
}