import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {openModal} from './../utils/Utils'
import AppBar from 'material-ui/lib/app-bar'
import MenuItem from 'material-ui/lib/menus/menu-item'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import FontIcon from 'material-ui/lib/font-icon'
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';

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

		/*return (
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
		)*/
    return (
      <AppBar 
        title="Mini Tasks"
       	showMenuIconButton={false}
        iconElementRight={
					<IconMenu
						iconButtonElement={
							<IconButton><MoreVertIcon /></IconButton>
						}
						targetOrigin={{horizontal: 'right', vertical: 'top'}}
						anchorOrigin={{horizontal: 'right', vertical: 'top'}}
					>
						<MenuItem
              containerElement={<Link to="/" />} 
							primaryText="My Boards"
              to="/"
							leftIcon= {<FontIcon className="fa fa-home"></FontIcon>}
						/>

            <MenuItem 
							primaryText="Sign out"
              onClick={this.props.onUserSignOut} 
							leftIcon= {<FontIcon className="fa fa-sign-out"></FontIcon>}
						/>
					</IconMenu>
				}
			/>
    )
	}

}
