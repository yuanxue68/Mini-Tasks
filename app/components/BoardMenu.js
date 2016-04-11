import React, {Component} from 'react'
import EditorInsertChart from 'material-ui/lib/svg-icons/editor/insert-chart'
import CurrentMembers from './CurrentMembers'
import AddMembers from './AddMembers'
import Colors from 'material-ui/lib/styles/colors'
import FlatButton from 'material-ui/lib/flat-button'
import {Link} from 'react-router'

class BoardMenu extends Component {
  constructor(props){
    super(props)
  }

  render(){
    const {boardInfo, members} = this.props
    return(
      <div>
        <CurrentMembers members={members}/>
        <br/>
        <AddMembers {...this.props}/>
        <h4><i className="fa fa-filter"></i> Filter Items</h4>
        <FlatButton label="Start Filtering" 
          linkButton={true}
          containerElement={<Link to={`/board/${boardInfo._id}/filter`} />} 
        />
        <br/>
        <br/>

        <h4><i className="fa fa-archive"></i> Archived Lists</h4>
        <FlatButton label="Show Archived Lists" 
          linkButton={true}
          containerElement={<Link to={`/board/${boardInfo._id}/archived`} />}
        />
        <br/>
        <br/>

        <h4><i className="fa fa-circle" style={{color: Colors.pink500}}></i> Background Color</h4>
        <FlatButton label="Change Board Color" secondary={true} />
      </div>
    )
  }
}

export default BoardMenu
