import React, { Component } from 'react';
import { connect } from 'react-redux'
import ItemList from './../components/ItemList';
import { ItemTypes } from './../actions/DndActions';
import { DropTarget, DragSource } from 'react-dnd';
import { getCookie } from './../utils/Utils'
import { populateItemToModal } from './../actions/ItemActions'
import { openModal } from './../actions/ModalActions'
import {archiveItemList} from './../actions/ItemListActions'
import flow from 'lodash/flow'

const itemListSource = {
  beginDrag(props) {
    return props.itemList
  }
}

const dropTarget = {
  drop(props, monitor) {
    const type = monitor.getItemType()
    if(type==="item"){
      const droppedItem = monitor.getItem()
      const {onDropItem, itemList, findItemIndex, findPosition} = props
      const index = findItemIndex(droppedItem)
      const position = findPosition(index, itemList.items)
      droppedItem.itemListId = itemList._id
      droppedItem.pos = position
      onDropItem(droppedItem)
    } else if(type==="itemList"){
      const droppedItemList = monitor.getItem()
      const {onDropItemList, findItemListIndex, findPosition} = props
      const index = findItemListIndex(droppedItemList)
      const position = findPosition(index)
      droppedItemList.pos = position
      onDropItemList(droppedItemList)
    }
  },
  hover(props, monitor) {
    const type = monitor.getItemType()
    const {itemList} = props
    //when an list is empty, it has no item component in it
    //onhover of item component will not trigger so we handle it with list's hover
    if(type==="item" &&itemList.items.length === 0){
      const {findItemIndex, onHoverItem} = props
      const draggedItem = monitor.getItem()
      const draggedIndex = findItemIndex(draggedItem)
      // reducer depends on itemListId to determine which list to push the drag item in
      // so we create an object with itemListId in it
      onHoverItem(draggedItem, draggedIndex, {itemListId: itemList._id}, 0)
    } else if(type==='itemList'){
      const {findItemListIndex, onMoveItemList} = props 
      const draggedItemList = monitor.getItem()
      const hoveredItemList = itemList
      if(draggedItemList._id !== hoveredItemList._id){
        const hoveredIndex = findItemListIndex(hoveredItemList)
        onMoveItemList(draggedItemList, hoveredIndex)
      }
    }
  }

};

function dropCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

function dragCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class ItemListContainer extends Component {
  constructor(props) {
    super(props)
    this.onOpenItemInfoModal = this.onOpenItemInfoModal.bind(this)
    this.filterItems = this.filterItems.bind(this)
    this.onArchiveItemList = this.onArchiveItemList.bind(this)
  }

  filterItems(item){
    const {filter} = this.props
  
    if(filter.name){
      if(!item.name.includes(filter.name)){
        return false
      }
    }
    if(filter.dueBefore){
      if( (new Date(filter.dueBefore) <= new Date(item.dueDate)) || !item.dueDate){
        return false
      }
    }
    if(filter.dueAfter){
      if( (new Date(filter.dueAfter) >= new Date(item.dueDate)) || !item.dueDate ){
        return false
      }
    }
    if(filter.colors.length>0){
      if(!filter.colors.every((color)=>{return item.labels && (item.labels.indexOf(color) != -1) })){
        return false
      }
    }
    return true
  }

 
  onOpenItemInfoModal(itemInfo){
    const {dispatch} = this.props
    dispatch(openModal('itemInfo'))
    dispatch(populateItemToModal(itemInfo))
  }

  onArchiveItemList(){
    const {dispatch, itemList} = this.props
    const token = getCookie('yulloToken')
    dispatch(archiveItemList(itemList, token))
  }

  render() {
    const { connectDropTarget, connectDragSource, isOver, findItemIndex, onHoverItem } = this.props;
    return connectDropTarget(connectDragSource(
      <div className="item-list">
        <ItemList 
          {...this.props} 
          isOver={isOver}
          onOpenItemInfoModal={this.onOpenItemInfoModal}
          onArchiveItemList={this.onArchiveItemList}
          filterItems={this.filterItems}
          findItemIndex={findItemIndex}
          onHoverItem={onHoverItem}
        />
      </div>
    ))
  }
}

function mapStateToProps (state) {
  return {
    router: state.router,
    filter: state.filter
  }
}

export default connect(mapStateToProps)(
  flow(
    DragSource(ItemTypes.ITEMLIST, itemListSource, dragCollect),
    DropTarget([ItemTypes.ITEM, ItemTypes.ITEMLIST], dropTarget, dropCollect),
  )(ItemListContainer)
)

