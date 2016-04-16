import React, {Component} from 'react'
import ListItem from 'material-ui/lib/lists/list-item'
import List from 'material-ui/lib/lists/list'
import FontIcon from 'material-ui/lib/font-icon'
import Avatar from 'material-ui/lib/avatar'
import Colors from 'material-ui/lib/styles/colors'

export default class ArchivedList extends Component{
  render (){
    const {archivedItemLists, onRestoreList} = this.props
    const list = archivedItemLists.map((list)=>{
      return <ListItem
              primaryText={list.name} 
              onTouchTap={onRestoreList.bind(null, list)}
              leftAvatar={
                <Avatar 
                  icon={<FontIcon className="fa fa-list-alt" />}
                  backgroundColor={Colors.blue500} 
                />} 
              />
    })

    return(
      <div>
        {list}  
      </div>
    )
  }
}
