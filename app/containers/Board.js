import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {createItemList, deleteItemList, editItemList, getItemLists} from './../actions/ItemListActions'
import {createItem, deleteItem, editItem, populateItemToModal} from './../actions/ItemActions'
import {getBoard, changeBoardInput, editboard} from './../actions/BoardActions'
import { moveItem, hoverItem } from './../actions/DndActions'
import BoardPage from './../components/BoardPage'
import ItemModal from './../components/ItemModal'
import {getCookie} from './../utils/Utils'
import {getMembers} from './../actions/MemberActions'

export default class Board extends Component {
  constructor(props){
    super(props)
    this.onHoverItem = this.onHoverItem.bind(this)
    this.findItemIndex = this.findItemIndex.bind(this)
    this.findPosition = this.findPosition.bind(this)
    this.onDropItem = this.onDropItem.bind(this)
  }
	componentDidMount(){
		const { dispatch, router } = this.props
		var token = getCookie("yulloToken")
    dispatch(getItemLists(router.params.boardId, token))
		dispatch(getBoard(router.params.boardId, token))
    dispatch(getMembers(router.params.boardId, token))
	}
  onHoverItem(draggedItem, draggedIndex, hoveredItem, hoveredIndex){
    const {dispatch} = this.props
    dispatch(hoverItem(draggedItem, draggedIndex, hoveredItem, hoveredIndex))
  }

  findPosition(list, index){
    const distance = 65535
    if(list.length <= 1 && index === 0){
      return distance
    } else if(list.length === index+1) {
      return list[index-1].pos + distance 
    } else if(list.length >=1 && index === 0){
      return list[index+1].pos/2
    } else {
      return (list[index+1].pos + list[index-1].pos)/2
    }
  }

  findItemIndex(item){
    const {itemLists} = this.props
    const list = itemLists.filter( l => l._id == item.itemListId)[0]
    var index = -1
    for(var i = 0; i < list.items.length; i++){
      if(list.items[i]._id == item._id){
        index = i
      }
    }
    return index
  }

  onDropItem(item){
    const {dispatch} = this.props 
    const token = getCookie('yulloToken')
    dispatch(editItem(item, token))
  }

	render (){
		const {dispatch} = this.props
    const token = getCookie('yulloToken')
		return (
			<div>
				<BoardPage {...this.props} 
          onPopulateItemToModal={(itemInfo)=>dispatch(populateItemToModal(itemInfo))}
				  onCreateItem={(item)=>dispatch(createItem(item, token))}
			    onDropItem={this.onDropItem} 
          findItemIndex={this.findItemIndex}
          onHoverItem={this.onHoverItem}
          findPosition={this.findPosition}
        />
      </div>
		)
	}
}

function mapStateToProps (state) {
	return {
		authentication: state.authentication,
		itemLists: state.itemLists,
		itemInfo: state.itemInfo,
		boardInfo: state.boardInfo,
		router: state.router
	}
}

export default connect(mapStateToProps)(Board)
