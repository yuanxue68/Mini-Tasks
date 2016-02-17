import React, {Component} from 'react'
import Item from './Item'

export default class ItemLists extends Component{
	constructor(props){
		super(props)
		this.createItem = this.createItem.bind(this)
	}

	render(){
		const {itemList, router, onDeleteItem, onPopulateItemToModal, index, isOver} = this.props
		var overLay = isOver ? <div style={{
						position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: 'yellow',
          }} /> : null
		var items = itemList.items.map(function(item, index){
			return <Item key={index} item={item} onDeleteItem={onDeleteItem} onPopulateItemToModal={onPopulateItemToModal}/>
		})
		var inputId = "itemName"+index
		return (
			<div className ="col-md-3 dim-container">
				{overLay}
				<h4><i className="fa fa-columns"></i> {itemList.name}</h4>
				{items}
				<div className="input-group">
					<input id={inputId} type="text" className="form-control"/>
					<span className="input-group-btn">
						<button className="btn btn-info" onClick={this.createItem}><i className="fa fa-plus"></i></button>
					</span>
				</div>
				<br/>
				<div>
					<button type="button" className="btn btn-xs btn-danger" onClick={this.props.onDeleteItemList.bind(null, itemList._id, router.params.boardId)}>Remove List</button>
				</div>
			</div>
		)
	}

	createItem(){
		const {itemList, router, index} = this.props
		var name = $('#itemName'+index).val()
		if(!name.trim()){
			return
		}
		$('#itemName'+index).val("")
		var item = {
			name,
			itemListId: itemList._id,
			boardId: router.params.boardId
		}
		this.props.onCreateItem(item)
	}
}