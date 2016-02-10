import React, {Component} from 'react'
import { ItemTypes } from './../actions/DndActions';
import { DragSource } from 'react-dnd';

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
			<div className="well" style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold'
      }}>
				<button type="button" className="close" onClick={this.props.onDeleteItem.bind(null, item._id, item.itemListId)}><span>&times;</span></button>
				{this.props.item.name}
			</div>
		)
	}
}

export default DragSource(ItemTypes.ITEM, itemSource, collect)(Item);