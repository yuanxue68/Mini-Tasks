import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {openModal} from './../utils/Utils'

export default class Header extends Component{
	constructor(props) {
		super(props)
	}
	
	render() {
		var loggedInButtons
		if(this.props.authentication.authed){
			loggedInButtons = (<ul className="nav navbar-nav navbar-right">
					<li><a onClick={openModal.bind(null, "#userIdModal")}>GetUserId</a></li>
	        <li><a href="#" onClick={this.props.onUserSignOut}>Logout</a></li>
	      </ul>)
		} else {
			loggedInButtons = null
		}

		return (
			<div>
				<nav className="navbar navbar-inverse" role="navigation">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#login-nav">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<Link className="navbar-brand" to="/">
							Mini Tasks
						</Link>
					</div>
					<div className="collapse navbar-collapse" id="login-nav">
						{loggedInButtons}
					</div>
				</nav>
			</div>
		)
	}

}