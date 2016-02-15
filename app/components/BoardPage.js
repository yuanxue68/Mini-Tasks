import React, {Component} from 'react'
import {openModal} from './../utils/Utils'
import ItemLists from './ItemLists'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class BoardPage extends Component {

	constructor(props){
		super(props)
		this.inputChange = this.inputChange.bind(this)
		this.saveBoard = this.saveBoard.bind(this)
	}
	
	render(){
		return(
			<div className="container">
				<div className="form-group">
					<input id="boardName" type="text" className="form-control" onChange={this.inputChange} value={this.props.boardInfo.name} placeholder="Board Name"/>
				</div>
				<div className="form-group">
					<textarea id="boardDescription" className="form-control" onChange={this.inputChange} value={this.props.boardInfo.description} placeholder="Board Description"></textarea>
				</div>
				<div className="clearfix" >
						<div className="btn-group pull-right">
					    <button type="button"  className="btn btn-warning"><i className="fa fa-users"></i> New Member</button>
					    <button type="button" onClick={openModal.bind(null, "#itemListCreationModal")} className="btn btn-primary"><i className="fa fa-list"></i> New List</button>
				    </div>
				    <button type="button" className="btn btn-info pull-left" onClick={this.saveBoard}><i className="fa fa-floppy-o"></i> Save Board Info</button>
				</div>
				<br/>
				<ItemLists {...this.props}/>
			</div>
		)
	}

	inputChange() {
    var boardInfo = JSON.parse(JSON.stringify(this.props.boardInfo))//deep copy
    boardInfo.name = document.getElementById("boardName").value
    boardInfo.description = document.getElementById("boardDescription").value
    this.props.onChangeBoardInput(boardInfo)
  }

  saveBoard(){
  	var boardInfo = JSON.parse(JSON.stringify(this.props.boardInfo))//deep copy
    boardInfo.name = document.getElementById("boardName").value
    boardInfo.description = document.getElementById("boardDescription").value
    this.props.onEditBoard(boardInfo)
  }

}

export default DragDropContext(HTML5Backend)(BoardPage);