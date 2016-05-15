import React, {Component} from 'react'
import Item from './Item'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import ListCreationPopover from './../containers/ListCreationPopover'
import ItemCreationPopover from './../containers/ItemCreationPopover'
import FlatButton from 'material-ui/lib/flat-button'
import FontIcon from 'material-ui/lib/font-icon'
import isEqual from 'lodash/isEqual'

export default class ItemList extends Component{
	
	shouldComponentUpdate(nextProps, nextState){
    return !isEqual(this.props, nextProps)
  }

	render(){
		const {findItemIndex, onMoveItem, filterItems, itemList, boardId, onDeleteItem,} = this.props
    const {onOpenItemInfoModal, index, draggedListId, onArchiveItemList} = this.props
    var items = itemList.items.filter(filterItems).map((item, index) => {
      return <Item 
              key={item._id} 
              item={item} 
              findItemIndex={findItemIndex}
              onDeleteItem={onDeleteItem} 
              onOpenItemInfoModal={onOpenItemInfoModal}
              onMoveItem={onMoveItem}
              />
		})
    return (
      <div style={{backgroundColor: draggedListId === itemList._id ? '#A9A9A9':'', cursor:'move'}}>
        <ListCreationPopover edit={true} itemList={itemList} index={String(index)}/>
        <div style={{
          border: 'solid 1px #e9e9e9',
          width: 300
        }}>
          {items} 
        </div>
        <FlatButton label="Archive" onTouchTap={onArchiveItemList} icon={<FontIcon className="fa fa-archive"/>}/>
        <ItemCreationPopover index={String(index)} itemListId={itemList._id} boardId={boardId}/>
      </div>
    )
	}

}
