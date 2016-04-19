import React, {Component} from 'react'
import ItemListContainer from './../containers/ItemListContainer'

export default class ItemLists extends Component{
	constructor(props){
		super(props)
	}

	render(){
		const {findItemIndex, findPosition, onHoverItem, filter, itemLists, boardInfo, onOpenItemInfoModal, onDropItem, onPopulateItemToModal} = this.props
		if(itemLists){
			var listComponent = []
			for( var i = 0; i<itemLists.length; i++){
				listComponent.push(
						<ItemListContainer 
              index={i}
              key={i}
              filter={filter}
              onOpenItemInfoModal={onOpenItemInfoModal}
              boardId={boardInfo._id}
              itemList={itemLists[i]} 
              onPopulateItemToModal={onPopulateItemToModal}
						  onDropItem={onDropItem}
              findItemIndex={findItemIndex}
              findPosition={findPosition}
              onHoverItem={onHoverItem}
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
