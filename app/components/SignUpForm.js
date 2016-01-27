import React, {Component} from 'react'

export default class SignUpForm extends Component {
	constructor(props){
		super(props)
	}
	
	render(){
		return (
			<div className="col-md-8 col-md-offset-2">
				<h5>Sign Up</h5>
				<div className="form-group">
          <label>Username *</label>
          <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Username"/>
        </div>
        <div className="form-group">
          <label>Password *</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
        </div>
        <div className="form-group">
          <label>Password Confirmation *</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Repeat Password"/>
        </div>
        <div className="form-group">
          <label>Display Name *</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Display Name"/>
        </div>
        <div className="form-group">
          <label>Describe Yourself</label>
          <textarea type="password" rows="3" className="form-control" id="exampleInputPassword1" placeholder="Tell the world about yourself"/>
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
			</div>
		)
	}
}