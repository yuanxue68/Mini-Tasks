import React, {Component} from 'react'
import {openModal} from './../utils/Utils'
import ItemLists from './ItemLists'
import { DragDropContext } from 'react-dnd'
import {Link} from 'react-router'
import HTML5Backend from 'react-dnd-html5-backend'
import FlatButton from 'material-ui/lib/flat-button'
import FontIcon from 'material-ui/lib/font-icon'
import EditBoardPopover from './../containers/EditBoardPopover'

class BoardPage extends Component {

	constructor(props){
		super(props)
	}
	
	render(){
    const {boardInfo} = this.props
		return(
			<div className="container">
				<div className="clearfix" >
					<div className="btn-group pull-right">
				    <Link to={"board/"+this.props.params.boardId+"/members"} className="btn btn-warning"><i className="fa fa-users"></i> Members</Link>
				    <button type="button" onClick={openModal.bind(null, "#itemListCreationModal")} className="btn btn-primary"><i className="fa fa-list"></i> New List</button>
			    </div>
          <EditBoardPopover boardInfo={boardInfo}/>  
        </div>

				<br/>
				<ItemLists {...this.props}/>
			</div>
		)
	}

}

export default DragDropContext(HTML5Backend)(BoardPage);
