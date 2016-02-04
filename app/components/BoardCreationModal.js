import React, {Component} from 'react'
import {closeModal, getUserId} from './../utils/Utils'

export default class BoardCreationModal extends Component{
	constructor(props){
		super(props)
		this.createBoard= this.createBoard.bind(this)
	}
	render(){
		return(
			<div className="modal fade" id="boardCreationModal">
				<div className="modal-dialog modal-sm">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close"><span onClick={closeModal.bind(null,"#boardCreationModal")}>&times;</span></button>
							<h4 className="modal-title">NEW BOARD!!!</h4>
						</div>
						<div className="modal-body">
							<div className="form-group">
								<label htmlFor="">Board Name (Required)</label>
								<input id="boardName" className="form-control" type="text" placeholder="Board Name"/>
							</div>
							<div className="form-group">
								<label htmlFor="">Description</label>
								<input id="boardDescription" className="form-control" type="text" placeholder="Description"/>
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-info" onClick={this.createBoard}>Create</button>
						</div>
					</div>
				</div>
			</div>
		)
	}

	createBoard(){
		var name = $("#boardName").val()
		var description = $("#boardDescription").val()
		if((!name)){
			return
		}
		closeModal("#boardCreationModal")
		var board ={
			name,
			description,
			owner: getUserId(this.props.authentication.userInfo)
		}
		this.props.onCreateBoard(board)
	}
}