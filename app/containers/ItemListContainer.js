import React, { Component } from 'react';
import ItemList from './../components/ItemList';
import { moveItem, ItemTypes } from './../actions/DndActions';
import { DropTarget } from 'react-dnd';

const itemListTarget = {
  drop(props, monitor) {
    console.log(props);
    console.log(monitor.getItem())
    if(monitor.getItem().itemListId === props.itemList._id)
      return
    props.onMoveItem(monitor.getItem(), props.itemList._id)
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}
class ItemListContainer extends Component {
  render() {
    const { connectDropTarget, isOver } = this.props;

    return connectDropTarget(
      <div>
        <ItemList {...this.props} isOver={isOver}/>
      </div>
    );
  }
}

export default DropTarget(ItemTypes.ITEM, itemListTarget, collect)(ItemListContainer);

