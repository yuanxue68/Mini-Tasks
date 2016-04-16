import React, {Component} from 'react'
import { ItemTypes } from './../actions/DndActions'
import { DragSource } from 'react-dnd'
import {openModal} from './../utils/Utils'
import ListItem from 'material-ui/lib/lists/list-item'
import Divider from 'material-ui/lib/divider'
import ActionAssignment from 'material-ui/lib/svg-icons/action/assignment'
import Avatar from 'material-ui/lib/avatar'
import Colors from 'material-ui/lib/styles/colors'
import Tag from './../components/Tag'
import {buildDateText, getInitial} from './../utils/Utils'

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
  }

	render(){
		const { item, connectDragSource, onOpenItemInfoModal, isDragging } = this.props;
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
    return connectDragSource(
      <div>
        <div className="tag-container">
          {tags}
        </div>
	      <ListItem 
          onTouchTap={onOpenItemInfoModal.bind(this, item)}
          primaryText={item.name} 
          leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={itemColor} />}
          rightAvatar={assigner}
          style={{backgroundColor: isDragging ? '#e9e9e9' : 'white'}}
        />
        {dueDateTag}
        <Divider style={{height:2}}/>
      </div>
		)
	}

}

export default DragSource(ItemTypes.ITEM, itemSource, collect)(Item);
