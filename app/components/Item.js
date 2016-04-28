import React, {Component} from 'react'
import {ItemTypes} from './../actions/DndActions'
import {DragSource, DropTarget} from 'react-dnd'
import Divider from 'material-ui/lib/divider'
import ActionAssignment from 'material-ui/lib/svg-icons/action/assignment'
import Avatar from 'material-ui/lib/avatar'
import Colors from 'material-ui/lib/styles/colors'
import Tag from './../components/Tag'
import {buildDateText, getInitial} from './../utils/Utils'
import flow from 'lodash/flow'
import isEqual from 'lodash/isEqual'


const itemSource = {
  beginDrag(props) {
    return {
      item: props.item,
      originalItemListId: props.item.itemListId,
      originalIndex: props.findItemIndex(props.item)
    }
  },
  endDrag(props, monitor){
    const {item: droppedItem, originalIndex, originalItemListId} = monitor.getItem()
    if(!monitor.didDrop()){
      props.onMoveItem(droppedItem, originalItemListId, originalIndex)
    }
  }
}

const itemTarget = {
  hover(props, monitor){
    const {findItemIndex, onMoveItem} = props
    const draggedItem = monitor.getItem().item
    const hoveredItem = props.item
    if(draggedItem._id !== hoveredItem._id){
      const hoveredIndex = findItemIndex(hoveredItem)
      onMoveItem(draggedItem, hoveredItem.itemListId, hoveredIndex)
    }
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
    dragObj: monitor.getItem()
  }
}

class Item extends Component{
	constructor(props){
		super(props)
		this.state = {numOfHover: 0}
	}

  shouldComponentUpdate(nextProps){
    return !isEqual(this.props.item, nextProps.item) || !isEqual(this.props.dragObj, nextProps.dragObj)
  }
	
	render(){
		const { item,connectDropTarget, connectDragSource, onOpenItemInfoModal, dragObj } = this.props;
    const labels = item.labels.length === 0 ? ['transparent'] : item.labels
		const tags = labels.map((label)=>{
      return <Tag color={label} key={label}/>      
    })
    const assigner = item.assigner && item.assigner.name ? 
                        <Avatar style={{verticalAlign: 'top', margin:10}} >{getInitial(item.assigner.name)}</Avatar>: null
    const dueDateTag = item.dueDate ?
      (<div style={{fontSize:12,paddingRight:15, textAlign: 'right'}}>
        Due On: {buildDateText(new Date(item.dueDate))}
      </div>) : null
    {/* mark it red if the item is over due */}
    const itemColor = item.dueDate && new Date(item.dueDate) < new Date() ? Colors.red500 : Colors.blue500
    return connectDropTarget(connectDragSource(
      <div onClick={onOpenItemInfoModal.bind(this, item)} >
        <div style={{
          textAlign: 'left',
          whiteSpace: 'normal',
          lineHeight: '10px'
        }}>
          {tags}
        </div>
	      <div className="text-left" style={{backgroundColor: dragObj && dragObj.item && dragObj.item._id === item._id ? '#A9A9A9':''}}>
          <Avatar icon={<ActionAssignment />} backgroundColor={itemColor} style={{verticalAlign: 'top', margin:10}} />
          <div 
            style={{display:'inline-block', 
            marginTop:20, 
            width:178, 
            maxWidth:178,
            textOverflow: 'ellipsis', 
            overFlow: 'hidden',
            textAlign: 'center'}}>
            {item.name}
          </div>
          {assigner}
        </div>
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
