import React, {Component} from 'react'
import LoginForm from './../components/LoginForm'

export default class Login extends Component {
	constructor(props){
		super(props)
	}
	
	render(){
		return (
			<div className="container">
				<LoginForm/>
			</div>
		)
	}
}