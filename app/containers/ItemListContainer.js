import React, { Component } from 'react';
import { connect } from 'react-redux'
import ItemList from './../components/ItemList';
import { moveItem, ItemTypes } from './../actions/DndActions';
import { DropTarget } from 'react-dnd';
import { getCookie } from './../utils/Utils'
import { deleteItemList } from './../actions/ItemListActions'
import { deleteItem } from './../actions/ItemActions'

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
    this.onDeleteItem = this.onDeleteItem.bind(this)
    this.onDeleteItemList = this.onDeleteItemList.bind(this)
  }

  onDeleteItem(itemId, ItemListId, e){
    const {dispatch} = this.props
    const token = getCookie('yulloToken')
    e.stopPropagation()
    dispatch(deleteItemList(itemId, itemListId, token))
  }

  onDeleteItemList(itemListId, boardId){
    const {dispatch} = this.props
    const token = getCookie('yulloToken')
    dispatch(deleteItemList(itemListId, boardId, token))
  }

  render() {

    const { connectDropTarget, isOver } = this.props;
    return connectDropTarget(
      <div className="item-list">
        <ItemList 
          {...this.props} 
          isOver={isOver}
          onDeleteItem = {this.onDeleteItem}
          onDeleteItemList = {this.onDeleteItemList}
        />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    router: state.router
  }
}

export default connect(mapStateToProps)(DropTarget(ItemTypes.ITEM, itemListTarget, collect)(ItemListContainer))

