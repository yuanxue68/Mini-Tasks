import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {editItemList, getItemLists} from './../actions/ItemListActions'
import {editItem, populateItemToModal} from './../actions/ItemActions'
import {getBoard} from './../actions/BoardActions'
import {moveItemList, moveItem} from './../actions/DndActions'
import BoardPage from './../components/BoardPage'
import {getCookie} from './../utils/Utils'
import {getMembers} from './../actions/MemberActions'
import {startDrag, stopDrag} from './../actions/RootActions'
import CircularProgress from 'material-ui/lib/circular-progress'

export default class Board extends Component {
  constructor(props){
    super(props)
    this.onMoveItem = this.onMoveItem.bind(this)
    this.onMoveItemList = this.onMoveItemList.bind(this)
    this.findItemIndex = this.findItemIndex.bind(this)
    this.findItemListIndex = this.findItemListIndex.bind(this)
    this.findPosition = this.findPosition.bind(this)
    this.onDropItem = this.onDropItem.bind(this)
    this.onDropItemList = this.onDropItemList.bind(this)
  }
	componentDidMount(){
		const { dispatch, router } = this.props
		var token = getCookie("yulloToken")
    dispatch(getItemLists(router.params.boardId, token))
		dispatch(getBoard(router.params.boardId, token))
    dispatch(getMembers(router.params.boardId, token))
	}

  onMoveItem(draggedItem, newItemListId, newIndex){
    const {dispatch} = this.props
    dispatch(moveItem(draggedItem, newItemListId, newIndex))
  }

  onMoveItemList(draggedItemList, hoveredIndex){
    const {dispatch} = this.props
    dispatch(moveItemList(draggedItemList, hoveredIndex))
  }

  findPosition(index, list=this.props.itemLists){
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

  findItemListIndex(itemList){
    const {itemLists} = this.props
    var index = -1
    for(var i=0; i<itemLists.length; i++){
      if(itemList._id === itemLists[i]._id){
        index = i
      }  
    }
    return index
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

  onDropItemList(itemList){
    const {dispatch} = this.props
    const token = getCookie('yulloToken')
    dispatch(editItemList(itemList, token))
  }

	render (){
		const {dispatch, loadingStatus} = this.props
    const token = getCookie('yulloToken')
    var content
    if(!loadingStatus.loadingItemlists){
      content = <BoardPage {...this.props} 
          onPopulateItemToModal={(itemInfo)=>dispatch(populateItemToModal(itemInfo))}
			    onDropItem={this.onDropItem} 
          onDropItemList={this.onDropItemList}
          findItemIndex={this.findItemIndex}
          findItemListIndex={this.findItemListIndex}
          onMoveItem={this.onMoveItem}
          onMoveItemList={this.onMoveItemList}
          findPosition={this.findPosition}
        />

    } else {
      content = <div className="text-center">
        <CircularProgress size={4}/>
      </div>
    }
		return (
			<div>
        {content}
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
		router: state.router,
    loadingStatus: state.loadingStatus
	}
}

export default connect(mapStateToProps)(Board)
