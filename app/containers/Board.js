import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {createItemList, deleteItemList, editItemList, getItemLists} from './../actions/ItemListActions'

export default class Board extends Component {
	componentDidMount(){
		const { dispatch } = this.props
		dispatch(getItemLists(this.props.router.params.boardId))
	}

	render (){
		return (
			<div>my boad</div>
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