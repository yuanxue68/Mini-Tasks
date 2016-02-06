import React, {Component} from 'react'

export default class ItemLists extends Component{
	constructor(props){
		super(props)
	}

	render(){
		const {itemLists} = this.props
		var listComponent = itemLists.forEach(function(itemList){
			return <ItemList itemList={itemList} />
		});
		return (
			<div>
				{listComponent}
			</div>
		)
	}
}