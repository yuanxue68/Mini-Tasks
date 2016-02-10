import React, {Component} from 'react'
import {openModal} from './../utils/Utils'
import ItemLists from './ItemLists'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class BoardPage extends Component {
	
	render(){
		return(
			<div className="container">
				<div className="clearfix" >
				    <button type="button" onClick={openModal.bind(null, "#itemListCreationModal")} className="btn btn-primary pull-right">New List</button>
				</div>
				<br/>
				<ItemLists {...this.props}/>
			</div>
		)
	}
}

export default DragDropContext(HTML5Backend)(BoardPage);