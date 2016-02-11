import React, {Component} from 'react'
import ItemListContainer from './../containers/ItemListContainer'

export default class ItemLists extends Component{
	constructor(props){
		super(props)
	}

	render(){
		const {itemLists, router, onDeleteItemList, onCreateItem, onDeleteItem, onMoveItem} = this.props
		if(itemLists){
			var listComponent = []
			var i = 0
			//need to enclose every four Itemlist in a row div, add index by 4 and then loop through the remainder
			for(i = 0; i<itemLists.length-4; i = i + 4){
				console.log(i)
				listComponent.push(
					<div className="row" index={i}>
						<ItemListContainer index={i} key={i} itemList={itemLists[i]} onCreateItem={onCreateItem} 
							onDeleteItem={onDeleteItem} router={router} onDeleteItemList={onDeleteItemList} onMoveItem={onMoveItem}/>
						<ItemListContainer index={i+1} key={i+1} itemList={itemLists[i+1]} onCreateItem={onCreateItem} 
							onDeleteItem={onDeleteItem} router={router} onDeleteItemList={onDeleteItemList} onMoveItem={onMoveItem}/>
						<ItemListContainer index={i+2} key={i+2} itemList={itemLists[i+2]} onCreateItem={onCreateItem} 
							onDeleteItem={onDeleteItem} router={router} onDeleteItemList={onDeleteItemList} onMoveItem={onMoveItem}/>
						<ItemListContainer index={i+3} key={i+3} itemList={itemLists[i+3]} onCreateItem={onCreateItem} 
							onDeleteItem={onDeleteItem} router={router} onDeleteItemList={onDeleteItemList} onMoveItem={onMoveItem}/>
					</div>
				)
			}
			//include the remainder of Itemlist 
			var remainingList = []
			for (i; i<itemLists.length; i++){
				remainingList.push(<ItemListContainer index={i} key={i} itemList={itemLists[i]} onCreateItem={onCreateItem} 
					onDeleteItem={onDeleteItem} router={router} onDeleteItemList={onDeleteItemList} onMoveItem={onMoveItem}/>)
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