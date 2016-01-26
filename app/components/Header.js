import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'

export default class Header extends Component{
	constructor(props) {
		super(props)
	}
	
	render() {
		return (
			<div>
				<nav className="navbar navbar-default">
					<div className="container">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#login-nav">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
							<Link className="navbar-brand" to="/">
								<img alt="Brand" />
							</Link>
						</div>
						<div className="navbar-form navbar-left" role="search">
			        <div className="form-group">
			          <input type="text" className="form-control" placeholder="Search"/>
			        </div>
			      </div>
						<div className="collapse navbar-collapse" id="login-nav">
							<ul className="nav navbar-nav navbar-right">
				        <li><Link to="/">Logout</Link></li>
				      </ul>
						</div>
					</div>
				</nav>
			</div>
		)
	}

}