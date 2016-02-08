import React, {Component} from 'react'
import {Link} from 'react-router'

export default class BoardCard extends Component {
	render(){
		const {board} = this.props

		return (
			<Link to={"/board/"+board._id}>
				<div className="well">
					<button type="button" className="close"><span onClick={this.props.onDeleteBoard.bind(null, this.props.board._id)}>&times;</span></button>
					<h6>Name: {board.name}</h6>
					<label>Description:</label>
					<div>{board.description}</div>
				</div>
			</Link>
		)
	}
}