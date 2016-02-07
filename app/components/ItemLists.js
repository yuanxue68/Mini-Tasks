import React, {Component} from 'react'
import ItemList from './ItemList'

export default class ItemLists extends Component{
	constructor(props){
		super(props)
	}

	render(){
		const {itemLists} = this.props
		if(itemLists){
			var listComponent = itemLists.map(function(itemList, index){
				return <ItemList key={index} itemList={itemList} />
			});
		}
		
		return (
			<div>
				{listComponent}
			</div>
		)
	}
}