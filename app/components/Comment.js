import React, {Component} from 'react'
import Avatar from 'material-ui/lib/avatar'
import Card from 'material-ui/lib/card/card'
import CardHeader from 'material-ui/lib/card/card-header'
import CardText from 'material-ui/lib/card/card-text'

export default class Comments extends Component {
  render(){
    const {comment} = this.props
    return(
      <Card>
        <CardHeader
          avatar={<Avatar/>}
          title="name"
        />
        <CardText>
          {comment}
        </CardText>
      </Card>
    )
  }
}
