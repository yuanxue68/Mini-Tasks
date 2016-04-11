import React, {Component} from 'react'
import Avatar from 'material-ui/lib/avatar'
import Colors from 'material-ui/lib/styles/colors'
import {getInitial} from './../utils/Utils'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'

class UserList extends Component {
  render(){
    const {users, onClick} = this.props
    var list = users.map((user)=>{
      return (<ListItem 
        key={user._id}
        onTouchTap={onClick.bind(null, user)}
        primaryText={user.name}
        leftAvatar={
          <Avatar color={Colors.grey50} backgroundColor={Colors.yellow600}>
            {getInitial(user.name)}
          </Avatar>
        }
      />)
    })

    return (
      <List>
        {list}
      </List>
    )
  }
}

export default UserList
