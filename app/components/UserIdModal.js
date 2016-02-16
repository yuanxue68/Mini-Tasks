import React, {Component} from 'react'
import {closeModal, getUserId} from './../utils/Utils'
import {getCookie} from './../utils/Utils'

export default class UserIdModal extends Component{
	constructor(props){
		super(props)
	}
	render(){
		//console.log(getCookie("yulloToken"))
		return(
			<div className="modal fade" id="userIdModal">
				<div className="modal-dialog modal-sm">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close"><span onClick={closeModal.bind(null,"#userIdModal")}>&times;</span></button>
							<span>{this.props.userInfo._id}</span>
						</div>
					</div>
				</div>
			</div>
		)
	}
}