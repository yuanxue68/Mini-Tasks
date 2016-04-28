import React, {Component} from 'react'
import ItemListContainer from './../containers/ItemListContainer'
import isEqual from 'lodash/isEqual'

export default class ItemLists extends Component{
	constructor(props){
		super(props)
	}

	render(){
		const {findItemIndex, findItemListIndex, findPosition, onMoveItemList, onMoveItem, filter, itemLists} = this.props
    const {boardInfo, onOpenItemInfoModal, onDropItem, onDropItemList, onPopulateItemToModal} = this.props
		var listComponent
		if(itemLists){
			listComponent = itemLists.map((itemList, index)=>{
					return <ItemListContainer 
						key={itemList._id}
						index={index}
						filter={filter}
						onOpenItemInfoModal={onOpenItemInfoModal}
						boardId={boardInfo._id}
						itemList={itemList} 
						onPopulateItemToModal={onPopulateItemToModal}
						onDropItem={onDropItem}
						onDropItemList={onDropItemList}
						findItemIndex={findItemIndex}
						findItemListIndex={findItemListIndex}
						findPosition={findPosition}
						onMoveItem={onMoveItem}
						onMoveItemList={onMoveItemList}
					/>
			})
		}
		
		return (
			<div style={{
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto'
      }} >
				  {listComponent}
      </div>
		)
	}
}
