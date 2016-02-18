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
  constructor(props){
    super(props)
    this.onOpen = this.onOpen.bind(this)
  }

	render(){
		const { connectDragSource, isDragging } = this.props;
		const {item} = this.props
		return connectDragSource(
			<div className="well card" onClick={this.onOpen} style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold'
      }}>
      	<i className="fa fa-tasks"></i>
				<button type="button" className="close" onClick={this.props.onDeleteItem.bind(null, item._id, item.itemListId)}><span>&times;</span></button>
				<span className={"label label-"+this.props.item.colorLabel}>   {this.props.item.colorLabel}</span>
        <span> 	 {this.props.item.name}</span>
			</div>
		)
	}

  onOpen(){
    const {item, onPopulateItemToModal} = this.props
    openModal("#itemInfoModal")
    onPopulateItemToModal(item)
  }
}

export default DragSource(ItemTypes.ITEM, itemSource, collect)(Item);