import React, {Component} from 'react'
import {Link} from 'react-router'
import RaisedButton from 'material-ui/lib/raised-button'
import FontIcon from 'material-ui/lib/font-icon'

const style = {
  margin: 10,
  verticalAlign: 'top'
}

export default class LoggedOutHome extends Component {
	
	render(){
		return (
			<div className="flex-landing">
				<div>
					<h1>Mini Tasks</h1>
					<h5><i className="fa fa-tasks"></i><span className="primary-font"> A Simple drag and drop task tracking site </span><i className="fa fa-tasks"></i></h5>
					<hr/>
					<br/>
          <div>
            <RaisedButton 
              secondary={true} 
              linkButton={true} 
              style={style}
              label="Facebook Sign In"
              href="/api/auth/facebook"
              icon={<FontIcon className="fa fa-facebook"/>}
            />
            <RaisedButton
              linkButton={true}
              style={style}
              label="Sign In"
              containerElement={<Link to="/login"></Link>}
            />
            <RaisedButton
              linkButton={true}
              primary={true}
              style={style}
              label="Sign Up"
              containerElement={<Link to="/signup"></Link>}
            />
          </div>
				</div>
			</div>
		)
	}
}
