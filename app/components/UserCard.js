import React, {Component} from 'React'
import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardText from 'material-ui/lib/card/card-text'
import FlatButton from 'material-ui/lib/flat-button'
import CardTitle from 'material-ui/lib/card/card-title'

class UserCard extends Component {
  render(){
    const {user, boardInfo, onDeleteMember} = this.props
    const deleteButton = boardInfo.owner !== user._id ? 
        <CardActions>
          <FlatButton label="Remove" onTouchTap={onDeleteMember.bind(null,user._id)}/>
        </CardActions> : 
        <CardTitle subtitle={<div><i className="fa fa-lock"> Owner</i></div>} />

    console.log(boardInfo.owner)
    console.log(user._id)
    return(
      <Card style={{width:200}}>
        <CardText>
          <h4>{user.name.toUpperCase()}</h4>
          <h5>Description</h5>
          {user.description}
        </CardText>
        {deleteButton}
      </Card>
    )
  }
}

export default UserCard
