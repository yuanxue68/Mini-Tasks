import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {createItemList, deleteItemList, editItemList, getItemLists} from './../actions/ItemListActions'
import {createItem, deleteItem, editItem, getItem} from './../actions/ItemActions'
import { moveItem } from './../actions/DndActions';
import BoardPage from './../components/BoardPage'
import ListCreationModal from './../components/ListCreationModal'
import ItemModal from './../components/ItemModal'

export default class Board extends Component {
	componentDidMount(){
		const { dispatch } = this.props
		dispatch(getItemLists(this.props.router.params.boardId))
	}

	render (){
		const {dispatch} = this.props
		return (
			<div>
				<ListCreationModal {...this.props}
				onCreateItemList={(itemListsInfo, boardId)=>dispatch(createItemList(itemListsInfo, boardId))}/>
				<ItemModal {...this.props}
				editItem={(itemInfo)=>dispatch(editItem(itemInfo))}></ItemModal>
				<BoardPage {...this.props} 
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
		router: state.router
	}
}

export default connect(mapStateToProps)(Board)