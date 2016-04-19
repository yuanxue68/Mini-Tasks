import React, {Component} from 'react'
import { ItemTypes } from './../actions/DndActions'
import { DragSource, DropTarget } from 'react-dnd'
import {openModal} from './../utils/Utils'
import ListItem from 'material-ui/lib/lists/list-item'
import Divider from 'material-ui/lib/divider'
import ActionAssignment from 'material-ui/lib/svg-icons/action/assignment'
import Avatar from 'material-ui/lib/avatar'
import Colors from 'material-ui/lib/styles/colors'
import Tag from './../components/Tag'
import {buildDateText, getInitial} from './../utils/Utils'
import flow from 'lodash/flow'


const itemSource = {
  beginDrag(props) {
    return props.item;
  }
}

const itemTarget = {
  hover(props, monitor){
    const {findItemIndex, onHoverItem} = props
    const draggedItem = monitor.getItem()
    const hoveredItem = props.item
    if(draggedItem._id !== hoveredItem._id){
      const draggedIndex = findItemIndex(draggedItem)
      const hoveredIndex = findItemIndex(hoveredItem)
      onHoverItem(draggedItem, draggedIndex, hoveredItem, hoveredIndex)
    }
  },
  drop(props, monitor){
    /*const {findItemIndex, onHoverItem} = props
    const draggedItem = monitor.getItem()
    const hoveredItem = props.item
    console.log(draggedItem, hoveredItem)
    if(draggedItem._id !== hoveredItem._id){
      const draggedIndex = findItemIndex(draggedItem)
      const hoveredIndex = findItemIndex(hoveredItem)
      //onHoverItem(draggedItem, draggedIndex, hoveredItem, hoveredIndex)
    }*/
  }
}

function dragCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

function dropCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    draggedItem: monitor.getItem()
  }
}

class Item extends Component{
  constructor(props){
    super(props)
  }

	render(){
		const { item,connectDropTarget, connectDragSource, onOpenItemInfoModal, draggedItem } = this.props;
		const tags = item.labels.map((label, index)=>{
      return <Tag color={label} key={index}/>      
    })
    const assigner = item.assigner && item.assigner.name ? 
                        <Avatar>{getInitial(item.assigner.name)}</Avatar>: null
    const dueDateTag = item.dueDate ?
      (<div style={{fontSize:12,paddingRight:15, textAlign: 'right'}}>
        Due On: {buildDateText(new Date(item.dueDate))}
      </div>) : null
    {/* mark it red if the item is over due */}
    const itemColor = item.dueDate && new Date(item.dueDate) < new Date() ? Colors.red500 : Colors.blue500
    return connectDropTarget(connectDragSource(
      <div>
        <div className="tag-container">
          {tags}
        </div>
	      <ListItem 
          onTouchTap={onOpenItemInfoModal.bind(this, item)}
          disableTouchRipple = {true}
          primaryText={item.name} 
          leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={itemColor} />}
          rightAvatar={assigner}
          style={{opacity: draggedItem && draggedItem._id === item._id ? '0' : '1'}}
        />
        {dueDateTag}
        <Divider style={{height:2}}/>
      </div>
		))
	}

}

export default flow(
    DragSource(ItemTypes.ITEM, itemSource, dragCollect),
    DropTarget(ItemTypes.ITEM, itemTarget, dropCollect)
)(Item)
