import React, {Component} from 'react'
import {Link} from 'react-router'
import {getCookie} from './../utils/Utils'

export default class LoggedOutHome extends Component {
	
	render(){
		return (
			<div className="container">
				<a className="btn btn-info"href="/api/auth/facebook">Login With Facebook</a>
				<Link className="btn btn-default" to="/login">Login With Yullo Account</Link>
				<Link className="btn btn-danger" to="/signup">Sign Up With Yullo</Link>
				<div>Hello</div>
				<div>{getCookie("yulloToken")}</div>
				<div>{document.cookie}</div>
			</div>
		)
	}
}