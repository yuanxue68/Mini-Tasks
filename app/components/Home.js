import React, {Component} from 'react'

export default class Home extends Component {
	
	render(){
		return (
			<div className="container">
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