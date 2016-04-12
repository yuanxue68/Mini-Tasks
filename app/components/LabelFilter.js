import React, {Component} from 'react'
import {getColorList} from './../utils/Utils'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import Avatar from 'material-ui/lib/avatar'

class LabelFilter extends Component {
  render(){
    const labelList = getColorList().map((color)=>{
          return <ListItem 
                    key={color}
                    leftAvatar={
                      <Avatar backgroundColor={color}/>}
                  >
                    Color Filter 
                  </ListItem>
       })
    return(
      <div>
        <h4>Filter by Label</h4>
        <List>
          {labelList}
        </List>
      </div>
    )
  }
}

export default LabelFilter 
