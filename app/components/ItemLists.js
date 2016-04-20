import React, {Component} from 'react'
import ItemListContainer from './../containers/ItemListContainer'

export default class ItemLists extends Component{
	constructor(props){
		super(props)
	}

	render(){
		const {findItemIndex, findItemListIndex, findPosition, onMoveItemList, onHoverItem, filter, itemLists} = this.props
    const {boardInfo, onOpenItemInfoModal, onDropItem, onDropItemList, onPopulateItemToModal} = this.props
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
              onDropItemList={onDropItemList}
              findItemIndex={findItemIndex}
              findItemListIndex={findItemListIndex}
              findPosition={findPosition}
              onHoverItem={onHoverItem}
              onMoveItemList={onMoveItemList}
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
