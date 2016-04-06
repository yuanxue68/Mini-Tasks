import React, {Component} from 'react'
import Item from './Item'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import ListCreationPopover from './../containers/ListCreationPopover'
import ItemCreationPopover from './../containers/ItemCreationPopover'

export default class ItemLists extends Component{
	constructor(props){
		super(props)
	}

	render(){
		const {itemList, boardId, onDeleteItem, onPopulateItemToModal, index, isOver} = this.props
		var dragNotice = isOver ? <ListItem primaryText="..." style={{backgroundColor:'#e9e9e9'}}/> : null
    var items = itemList.items.map((item, index) => {
      return <Item 
              key={index} 
              item={item} 
              onDeleteItem={onDeleteItem} 
              onPopulateItemToModal={onPopulateItemToModal}
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
