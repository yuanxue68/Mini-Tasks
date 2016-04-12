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
    return (
      <AppBar 
        title="Mini Tasks"
       	showMenuIconButton={false}
        titleStyle={{fontSize:18}}
        style={{height:50, minHeight:50}}
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
