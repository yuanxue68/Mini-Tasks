import React, {Component} from 'react'
import {Link} from 'react-router'

export default class Home extends Component {
	
	render(){
		return (
			<div className="container">
				<div className="btn btn-default btn-md">Login With Facebook</div>
				<Link className="btn btn-default btn-md" to="/login">Login With Yullo Account</Link>
				<Link className="btn btn-default btn-md" to="/signup">Sign Up With Yullo</Link>
				<div>Hello</div>
				<div>{this.getCookie("yulloToken")}</div>
				<div>{document.cookie}</div>
			</div>
		)
	}

	getCookie(name) {
	  var value = "; " + document.cookie;
	  var parts = value.split("; " + name + "=");
	  if (parts.length == 2) return parts.pop().split(";").shift();
	}
}