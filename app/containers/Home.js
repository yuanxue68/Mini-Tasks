import React, {Component} from 'react'
import {Link} from 'react-router'

export default class Home extends Component {
	
	render(){
		return (
			<div className="container">
				<div className="btn btn-info">Login With Facebook</div>
				<Link className="btn btn-default" to="/login">Login With Yullo Account</Link>
				<Link className="btn btn-danger" to="/signup">Sign Up With Yullo</Link>
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