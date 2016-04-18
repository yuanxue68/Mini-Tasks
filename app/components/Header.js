import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
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
    return (
      <AppBar 
        title="Mini Tasks"
        titleStyle={{fontSize:18}}
        style={{height:50, minHeight:50}}
        iconElementLeft={
          <IconButton containerElement={<Link to="/" />} linkButton={true} >
            <FontIcon
              className="fa fa-home"
            >
            </FontIcon>
          </IconButton>}

        iconElementRight={
					<IconMenu
						iconButtonElement={
							<IconButton><MoreVertIcon /></IconButton>
						}
						targetOrigin={{horizontal: 'right', vertical: 'top'}}
						anchorOrigin={{horizontal: 'right', vertical: 'top'}}
					>
						<MenuItem
              containerElement={<Link to="setting" />} 
							primaryText="Setting"
							leftIcon= {<FontIcon className="fa fa-gear"></FontIcon>}
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
