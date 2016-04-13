import React, {Component} from 'react'
import {getColorList} from './../utils/Utils'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import Avatar from 'material-ui/lib/avatar'

class LabelFilter extends Component {
  render(){
    const {filter} = this.props
    const labelList = getColorList().map((color)=>{
          let selected = filter.colors.includes(color) ? <i className="fa fa-check-square-o" aria-hidden="true"></i> : ""
          return <ListItem 
                    key={color}
                    onTouchTap={this.props.onChangeColorFilter.bind(null, color)}
                    leftAvatar={
                      <Avatar backgroundColor={color}/>}
                  >
                    <span>Color</span> {selected}
                  </ListItem>
       })
    return(
      <div>
        <h4>Filter by Color Label</h4>
        <List>
          {labelList}
        </List>
      </div>
    )
  }
}

export default LabelFilter 
