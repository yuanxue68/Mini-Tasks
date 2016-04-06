import React, {Component} from 'react'
import { ItemTypes } from './../actions/DndActions'
import { DragSource } from 'react-dnd'
import {openModal} from './../utils/Utils'
import ListItem from 'material-ui/lib/lists/list-item'
import Divider from 'material-ui/lib/divider'
import ActionAssignment from 'material-ui/lib/svg-icons/action/assignment'
import Avatar from 'material-ui/lib/avatar'
import Colors from 'material-ui/lib/styles/colors'

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
      <div>
	      <ListItem 
          primaryText={item.name} 
          leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={Colors.blue500} />}
          style={{backgroundColor: isDragging ? '#e9e9e9' : 'white'}}
        />
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
