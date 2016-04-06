import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {createItemList, deleteItemList, editItemList, getItemLists} from './../actions/ItemListActions'
import {createItem, deleteItem, editItem, populateItemToModal} from './../actions/ItemActions'
import {getBoard, changeBoardInput, editboard} from './../actions/BoardActions'
import { moveItem } from './../actions/DndActions';
import BoardPage from './../components/BoardPage'
import ItemModal from './../components/ItemModal'
import {getCookie} from './../utils/Utils'


export default class Board extends Component {
	componentDidMount(){
		const { dispatch, router } = this.props
		var token = getCookie("yulloToken")
    dispatch(getItemLists(router.params.boardId, token))
		dispatch(getBoard(router.params.boardId, token))
	}

	render (){
		const {dispatch} = this.props
    var token = getCookie('yulloToken')
		return (
			<div>
				<ItemModal {...this.props}
				onPopulateItemToModal={(itemInfo)=>dispatch(populateItemToModal(itemInfo))}
				onEditItem={(itemInfo)=>dispatch(editItem(itemInfo))}></ItemModal>
				<BoardPage {...this.props} 
				onPopulateItemToModal={(itemInfo)=>dispatch(populateItemToModal(itemInfo))}
				onCreateItem={(item)=>dispatch(createItem(item, token))}
			  onMoveItem={(itemInfo, targetItemListId)=>dispatch(moveItem(itemInfo, targetItemListId, token))} 
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
