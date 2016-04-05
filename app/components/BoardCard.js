import React, {Component} from 'react'
import {Link} from 'react-router'
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border';
import IconButton from 'material-ui/lib/icon-button';

export default class BoardCard extends Component {
	render(){
		const {board} = this.props

		/*
    return (
			<Link className="well square-card" to={"/board/"+board._id}>
				<button type="button" className="pull-right btn btn-danger" onClick={this.props.onDeleteBoard.bind(null, this.props.board._id)}><i className="fa fa-times"></i></button>
				<h6><i className="fa fa-clipboard"></i> {board.name}</h6>
				<div>Description: {board.description}</div>
			</Link>
		)
    */
    return (
      <Link to={"/board/"+board._id}>
        <GridTile
          title={board.name}
          subtitle={board.description}
          actionIcon={<IconButton><StarBorder color="white"/></IconButton>}
        >
          <img src="/img/note.png"/>
        </GridTile>
      </Link>
    )
	}
}
