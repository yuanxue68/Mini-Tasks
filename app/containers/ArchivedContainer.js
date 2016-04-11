import React, {Component} from 'react'
import FlatButton from 'material-ui/lib/flat-button'
import {connect} from 'react-redux'
import FontIcon from 'material-ui/lib/font-icon'
import {Link} from 'react-router'

class ArchivedContainer extends Component {

  render(){
    const {boardInfo} = this.props
    return(
      <div>
        <h4><i className="fa fa-archive"></i>Archived List</h4>
        <FlatButton label="Back"
          linkButton={true}
          containerElement={<Link to={`/board/${boardInfo._id}`}/>}
          icon={<FontIcon className="fa fa-angle-left" />}
        />
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    boardInfo: state.boardInfo
  }
}

export default connect(mapStateToProps)(ArchivedContainer)
