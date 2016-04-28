import React, {Component} from 'react'
import BoardCard from './BoardCard'
import BoardCreationModal from './../containers/BoardCreationModal'
import GridList from 'material-ui/lib/grid-list/grid-list'
import RaisedButton from 'material-ui/lib/raised-button'
import FontIcon from 'material-ui/lib/font-icon'

export default class Home extends Component {
	
	render(){
		const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        width: '80%',
        overflowY: 'auto',
        marginBottom: 24,
      },
    }

    const {boardList, onDeleteBoard} = this.props
		var BoardList = boardList.map(function(board, index){
			return <BoardCard key={index} board={board} onDeleteBoard={onDeleteBoard}/>
		}) 
		return (
			<div className="container" style={{
        marginBottom: 30,
        paddingBottom: 15,
        textAlign: 'center'
      }}>
				<h3 className="">My Boards</h3>
				<BoardCreationModal/> 
				<br/>
        <div style={styles.root}>
          <GridList
            cols={4}
            cellHeight={200}
            style={styles.gridList}
          >
            {BoardList}
          </GridList>
        </div>
      </div>
		)
	}
}
