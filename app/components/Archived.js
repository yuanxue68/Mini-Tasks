import React, {Component} from 'react'
import ArchivedList from './ArchivedList'
import {Link} from 'react-router'
import FontIcon from 'material-ui/lib/font-icon'
import FlatButton from 'material-ui/lib/flat-button'

export default class Archived extends Component {
  render(){
    const {prevPage, nextPage, boardInfo, archivedItemLists, onRestoreList} = this.props
    return(
      <div>
        <h4><i className="fa fa-archive"></i>Archived List</h4>
        <FlatButton label="Back"
          linkButton={true}
          containerElement={<Link to={`/board/${boardInfo._id}`}/>}
          icon={<FontIcon className="fa fa-angle-left" />}
        />
        <ArchivedList onRestoreList={onRestoreList} archivedItemLists={archivedItemLists}/>
        <div>
          <FlatButton label="Previous"
            onTouchTap={prevPage}
            labelPosition="before"
            icon={<FontIcon className="fa fa-angle-left" />}
          />
          <FlatButton label="Next"
            onTouchTap={nextPage}
            icon={<FontIcon className="fa fa-angle-right" />}
          />
        </div>
      </div>
    )
  }
}

