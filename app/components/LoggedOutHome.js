import React, {Component} from 'react'
import {Link} from 'react-router'
import {getCookie} from './../utils/Utils'

export default class LoggedOutHome extends Component {
	
	render(){
		return (
			<div className="flex-landing">
				<div>
					<h1>Mini Tasks</h1>
					<h5><i className="fa fa-tasks"></i><span className="primary-font"> A Simple drag and drop task tracking site </span><i className="fa fa-tasks"></i></h5>
					<hr/>
					<br/>
					<a className="btn btn-info btn-hg" href="/api/auth/facebook"><i className="fa fa-facebook"></i> Facebook Login</a>
					<Link className="btn btn-default btn-hg" to="/login">Sign In</Link>
					<Link className="btn btn-danger btn-hg" to="/signup">Sign Up</Link>
				</div>
			</div>
		)
	}
}