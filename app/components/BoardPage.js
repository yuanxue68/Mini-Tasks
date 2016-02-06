import React, {Component} from 'react'
import {openModal} from './../utils/Utils'
import ItemLists from './ItemLists'

export default class BoardPage extends Component {
	
	render(){
		return(
			<div className="container">
				<div className="clearfix" >
				    <button type="button" onClick={openModal.bind(null, "#itemListCreationModal")} className="btn btn-primary pull-right">New List</button>
				</div>
				{/*<ItemLists/>*/}
			</div>
		)
	}
}