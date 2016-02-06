import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {createItemList, deleteItemList, editItemList, getItemLists} from './../actions/ItemListActions'
import BoardPage from './../components/BoardPage'
import ListCreationModal from './../components/ListCreationModal'

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
				<BoardPage {...this.props} />
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