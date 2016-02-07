import React, {Component} from 'react'
import ItemList from './ItemList'

export default class ItemLists extends Component{
	constructor(props){
		super(props)
	}

	render(){
		const {itemLists, router, onDeleteItemList, onCreateItem, onDeleteItem} = this.props
		if(itemLists){
			var listComponent = itemLists.map(function(itemList, index){
				return <ItemList 
						index={index}
						key={index} itemList={itemList} 
						onCreateItem={onCreateItem}
						onDeleteItem={onDeleteItem}
						router={router} 
						onDeleteItemList={onDeleteItemList}/>
			});
		}
		
		return (
			<div>
				{listComponent}
			</div>
		)
	}
}