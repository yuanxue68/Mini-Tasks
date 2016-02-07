import React, {Component} from 'react'
import Item from './Item'

export default class ItemLists extends Component{
	constructor(props){
		super(props)
		this.createItem = this.createItem.bind(this)
	}

	render(){
		const {itemList, router, onDeleteItem} = this.props
		var items = itemList.items.map(function(item, index){
			return <Item key={index} item={item} onDeleteItem={onDeleteItem}/>
		})
		return (
			<div className ="col-md-3 well">
				<h4>{itemList.name}</h4>
				{items}
				<div className="input-group">
					<input id="itemName" type="text" className="form-control"/>
					<span className="input-group-btn">
						<button className="btn btn-inverse" onClick={this.createItem}>Add</button>
					</span>
				</div>
				<div>
					<br/>
					<button type="button" className="btn btn-xs btn-danger" onClick={this.props.onDeleteItemList.bind(null, itemList._id, router.params.boardId)}>Remove List</button>
				</div>
			</div>
		)
	}

	createItem(){
		const {itemList, router} = this.props
		var name = $('#itemName').val()
		$('#itemName').val("")
		var item = {
			name,
			itemListId: itemList._id,
			boardId: router.params.boardId
		}
		this.props.onCreateItem(item)
	}
}