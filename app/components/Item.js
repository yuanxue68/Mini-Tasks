import React, {Component} from 'react'
import { ItemTypes } from './../actions/DndActions';
import { DragSource } from 'react-dnd';
import {openModal} from './../utils/Utils'

const itemSource = {
  beginDrag(props) {
    return props.item;
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Item extends Component{
	render(){
		const { connectDragSource, isDragging } = this.props;
		const {item} = this.props
		return connectDragSource(
			<div className="well card" onClick={openModal.bind(null, "#itemInfoModal")} style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold'
      }}>
      	<i className="fa fa-tasks"></i>
				<button type="button" className="close" onClick={this.props.onDeleteItem.bind(null, item._id, item.itemListId)}><span>&times;</span></button>
				<span> 	 {this.props.item.name}</span>
			</div>
		)
	}
}

export default DragSource(ItemTypes.ITEM, itemSource, collect)(Item);