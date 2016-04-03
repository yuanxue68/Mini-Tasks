import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {createItemList, deleteItemList, editItemList, getItemLists} from './../actions/ItemListActions'
import {createItem, deleteItem, editItem, populateItemToModal} from './../actions/ItemActions'
import {getBoard, changeBoardInput, editboard} from './../actions/BoardActions'
import { moveItem } from './../actions/DndActions';
import BoardPage from './../components/BoardPage'
import ListCreationModal from './../components/ListCreationModal'
import ItemModal from './../components/ItemModal'
import {getCookie} from './../utils/Utils'


export default class Board extends Component {
	componentDidMount(){
		const { dispatch } = this.props
		var token = getCookie("yulloToken")
    dispatch(getItemLists(this.props.router.params.boardId))
		dispatch(getBoard(this.props.router.params.boardId, token))
	}

	render (){
		const {dispatch} = this.props
		return (
			<div>
				<ListCreationModal {...this.props}
				onCreateItemList={(itemListsInfo, boardId)=>dispatch(createItemList(itemListsInfo, boardId))}/>
				<ItemModal {...this.props}
				onPopulateItemToModal={(itemInfo)=>dispatch(populateItemToModal(itemInfo))}
				onEditItem={(itemInfo)=>dispatch(editItem(itemInfo))}></ItemModal>
				<BoardPage {...this.props} 
				onChangeBoardInput={(boardInfo)=>dispatch(changeBoardInput(boardInfo))}
				onEditBoard={(boardInfo)=>dispatch(editboard(boardInfo))}
				onPopulateItemToModal={(itemInfo)=>dispatch(populateItemToModal(itemInfo))}
				onCreateItem={(item)=>dispatch(createItem(item))}
				onDeleteItem={(itemId, itemListId, e)=>{e.stopPropagation(); dispatch(deleteItem(itemId, itemListId))}}
				onMoveItem={(itemInfo, targetItemListId)=>dispatch(moveItem(itemInfo, targetItemListId))}
				onDeleteItemList={(itemListId, boardId)=>dispatch(deleteItemList(itemListId, boardId))}/>
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
