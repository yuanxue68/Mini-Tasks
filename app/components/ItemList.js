import React, {Component} from 'react'
import Item from './Item'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import ListCreationPopover from './../containers/ListCreationPopover'
import ItemCreationPopover from './../containers/ItemCreationPopover'

export default class ItemLists extends Component{
	constructor(props){
		super(props)
	  this.filterItems = this.filterItems.bind(this)
  }

  filterItems(item){
    const {filter} = this.props
  
    if(filter.name){
      if(!item.name.includes(filter.name)){
        return false
      }
    }
    if(filter.date){
      if(new Date(filter.date)< new Date(item.dueDate)){
        return false
      }
    }
    if(filter.colors.length>0){
      if(!filter.colors.every((color)=>{item.labels && item.labels.indexOf(color)})){
        return false
      }
    }
    return true
  }

	render(){
		const {itemList, boardId, onDeleteItem, onOpenItemInfoModal, index, isOver} = this.props
		var dragNotice = isOver ? <ListItem primaryText="..." style={{backgroundColor:'#e9e9e9'}}/> : null
    var items = itemList.items.filter(this.filterItems).map((item, index) => {
      return <Item 
              key={item._id} 
              item={item} 
              onDeleteItem={onDeleteItem} 
              onOpenItemInfoModal={onOpenItemInfoModal}
              />
		})
		var inputId = "itemName"+index
  
    return (
      <div>
        <ListCreationPopover edit={true} itemList={itemList} index={String(index)}/>
        <List style={{border: 'solid 1px #e9e9e9'}}>
          {items} 
          {dragNotice}
        </List>
        <ItemCreationPopover index={String(index)} itemListId={itemList._id} boardId={boardId}/>
      </div>
    )
	}

}
