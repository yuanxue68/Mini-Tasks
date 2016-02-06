import React, {Component} from 'react'
import {closeModal, getUserId} from './../utils/Utils'

export default class ListCreationModal extends Component{
	constructor(props){
		super(props)
		this.createItemList = this.createItemList.bind(this)
	}
	render(){
		return(
			<div className="modal fade" id="itemListCreationModal">
				<div className="modal-dialog modal-sm">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close"><span onClick={closeModal.bind(null,"#itemListCreationModal")}>&times;</span></button>
							<h4 className="modal-title">NEW LIST!!!</h4>
						</div>
						<div className="modal-body">
							<div className="form-group">
								<label htmlFor="">List Name (Required)</label>
								<input id="itemListName" className="form-control" type="text" placeholder="List Name"/>
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-info" onClick={this.createItemList}>Create</button>
						</div>
					</div>
				</div>
			</div>
		)
	}

	createItemList(){
		var name = $("#itemListName").val()
		if((!name)){
			return
		}
		closeModal("#itemListCreationModal")
		var itemList ={
			name,
			boardId: this.props.router.params.boardId
		}
		this.props.onCreateItemList(itemList, this.props.router.params.boardId)
	}
}