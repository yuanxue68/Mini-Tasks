import React, {Component} from 'react'
import ItemListContainer from './../containers/ItemListContainer'

export default class ItemLists extends Component{
	constructor(props){
		super(props)
	}

	render(){
		const {itemLists, boardInfo, onMoveItem, onPopulateItemToModal} = this.props
		if(itemLists){
			var listComponent = []
			for( var i = 0; i<itemLists.length; i++){
				listComponent.push(
						<ItemListContainer 
              index={i}
              key={i}
              boardId={boardInfo._id}
              itemList={itemLists[i]} 
              onPopulateItemToModal={onPopulateItemToModal}
						  onMoveItem={onMoveItem}
            />
				)
			}
		}
		
		return (
			<div className="list-container" >
				  {listComponent}
      </div>
		)
	}
}
