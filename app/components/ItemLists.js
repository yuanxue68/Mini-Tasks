import React, {Component} from 'react'
import ItemList from './ItemList'

export default class ItemLists extends Component{
	constructor(props){
		super(props)
	}

	render(){
		const {itemLists, router, onDeleteItemList, onCreateItem, onDeleteItem} = this.props
		if(itemLists){
			var listComponent = []
			var i = 0
			//need to enclose every four Itemlist in a row div, add index by 4 and then loop through the remainder
			for(i = 0; i<itemLists.length-4; i = i + 4){
				console.log(i)
				listComponent.push(
					<div className="row" index={i}>
						<ItemList index={i} key={i} itemList={itemLists[i]} onCreateItem={onCreateItem} onDeleteItem={onDeleteItem} router={router} onDeleteItemList={onDeleteItemList}/>
						<ItemList index={i+1} key={i+1} itemList={itemLists[i+1]} onCreateItem={onCreateItem} onDeleteItem={onDeleteItem} router={router} onDeleteItemList={onDeleteItemList}/>
						<ItemList index={i+2} key={i+2} itemList={itemLists[i+2]} onCreateItem={onCreateItem} onDeleteItem={onDeleteItem} router={router} onDeleteItemList={onDeleteItemList}/>
						<ItemList index={i+3} key={i+3} itemList={itemLists[i+3]} onCreateItem={onCreateItem} onDeleteItem={onDeleteItem} router={router} onDeleteItemList={onDeleteItemList}/>
					</div>
				)
			}
			//include the remainder of Itemlist 
			var remainingList = []
			for (i; i<itemLists.length; i++){
				remainingList.push(<ItemList index={i} key={i} itemList={itemLists[i]} onCreateItem={onCreateItem} onDeleteItem={onDeleteItem} router={router} onDeleteItemList={onDeleteItemList}/>)
			}
			listComponent.push(<div className="row" index={i+1}>{remainingList}</div>)
		}
		
		return (
			<div>
				{listComponent}
			</div>
		)
	}
}