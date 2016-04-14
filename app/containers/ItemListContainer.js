import React, { Component } from 'react';
import { connect } from 'react-redux'
import ItemList from './../components/ItemList';
import { moveItem, ItemTypes } from './../actions/DndActions';
import { DropTarget } from 'react-dnd';
import { getCookie } from './../utils/Utils'
import { populateItemToModal } from './../actions/ItemActions'
import { openModal } from './../actions/ModalActions'
import {archiveItemList} from './../actions/ItemListActions'

const itemListTarget = {
  drop(props, monitor) {
    if(monitor.getItem().itemListId === props.itemList._id)
      return
    props.onMoveItem(monitor.getItem(), props.itemList._id)
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
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
    const { connectDropTarget, isOver } = this.props;
    return connectDropTarget(
      <div className="item-list">
        <ItemList 
          {...this.props} 
          isOver={isOver}
          onOpenItemInfoModal={this.onOpenItemInfoModal}
          onArchiveItemList={this.onArchiveItemList}
          filterItems = {this.filterItems}
        />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    router: state.router,
    filter: state.filter
  }
}

export default connect(mapStateToProps)(DropTarget(ItemTypes.ITEM, itemListTarget, collect)(ItemListContainer))

