import React, {Component} from 'react'
import {Link} from 'react-router'

export default class BoardCard extends Component {
	render(){
		const {board} = this.props

		return (
			<Link to={"/board/"+board._id}>
				<div className="well square-card">
					<button type="button" className="pull-right btn btn-danger" onClick={this.props.onDeleteBoard.bind(null, this.props.board._id)}><i className="fa fa-times"></i></button>
					<h6><i className="fa fa-clipboard"></i> {board.name}</h6>
					<label>Description:</label>
					<div>{board.description}</div>
				</div>
			</Link>
		)
	}
}