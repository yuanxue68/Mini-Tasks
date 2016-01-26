import React, {Component} from 'react'
import SignUpForm from './../components/SignUpForm'

export default class SignUp extends Component {
	constructor(props){
		super(props)
	}
	
	render(){
		return (
			<div className="container">
				<SignUpForm/>
			</div>
		)
	}
}