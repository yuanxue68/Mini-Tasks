import React, {Component} from 'react'

export default class BoardCard extends Component {
	render(){
		const {board} = this.props

		return (
			<div>
				{JSON.stringify(board)}
			</div>
		)
	}
}