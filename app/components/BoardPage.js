import React, {Component} from 'react'
import ItemLists from './ItemLists'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import EditBoardPopover from './../containers/EditBoardPopover'
import ListCreationPopover from './../containers/ListCreationPopover'
import BoardAside from './../containers/BoardAside'
import ItemInfoModal from './../containers/ItemInfoModal'

class BoardPage extends Component {

	constructor(props){
		super(props)
	}
	
	render(){
    const {boardInfo, children} = this.props
		return(
			<div className="container-fluid">
				<div className="clearfix" >
					<div className="pull-right">
            <ItemInfoModal/>
            <BoardAside children={children}/>
			      <ListCreationPopover/>
          </div>
          <EditBoardPopover boardInfo={boardInfo}/>  
        </div>

				<br/>
				<ItemLists {...this.props}/>
			</div>
		)
	}

}

export default DragDropContext(HTML5Backend)(BoardPage)
