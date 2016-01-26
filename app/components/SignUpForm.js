import React, {Component} from 'react'

export default class SignUpForm extends Component {
	constructor(props){
		super(props)
	}
	
	render(){
		return (
			<div>
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
          <textarea type="password" rows="5" className="form-control" id="exampleInputPassword1" placeholder="Tell the world about yourself"/>
        </div>
        <button type="submit" className="btn btn-default">Sign Up</button>
			</div>
		)
	}
}