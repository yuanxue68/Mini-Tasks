import React, {Component} from 'react'
import {openModal} from './../utils/Utils'
import ItemLists from './ItemLists'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class BoardPage extends Component {
	
	render(){
		return(
			<div className="container">
				<div className="form-group">
					<input type="text" className="form-control" placeholder="Board Name"/>
				</div>
				<div className="form-group">
					<textarea className="form-control" placeholder="Board Description"></textarea>
				</div>
				<div className="clearfix" >
				    <button type="button" onClick={openModal.bind(null, "#itemListCreationModal")} className="btn btn-primary pull-right"><i className="fa fa-list"></i> New List</button>
				    <button type="button"  className="btn btn-info pull-left"><i className="fa fa-floppy-o"></i> Save Changes</button>
				</div>
				<br/>
				<ItemLists {...this.props}/>
			</div>
		)
	}
}

export default DragDropContext(HTML5Backend)(BoardPage);