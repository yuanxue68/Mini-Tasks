import React, {Component} from 'react'
import {openModal} from './../utils/Utils'
import ItemLists from './ItemLists'
import { DragDropContext } from 'react-dnd'
import {Link} from 'react-router'
import HTML5Backend from 'react-dnd-html5-backend'
import FlatButton from 'material-ui/lib/flat-button'
import FontIcon from 'material-ui/lib/font-icon'
import EditBoardPopover from './../containers/EditBoardPopover'
import ListCreationModal from './../containers/ListCreationModal'
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
			      <ListCreationModal/>
				    <Link to={"board/"+this.props.params.boardId+"/members"} className="btn btn-warning"><i className="fa fa-users"></i> Members</Link>
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
