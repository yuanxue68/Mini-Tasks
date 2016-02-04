import React, {Component} from 'react'

export default class BoardCard extends Component {
	render(){
		const {board} = this.props

		return (
			<div className="well">
				<button type="button" className="close"><span onClick={this.props.onDeleteBoard.bind(null, this.props.board._id)}>&times;</span></button>
				<div>name: {board.name}</div>
				<label>Description:</label>
				<div>{board.Description}</div>
			</div>
		)
	}
}