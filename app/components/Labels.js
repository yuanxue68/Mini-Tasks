import React, {Component} from 'React'
import Avatar from 'material-ui/lib/avatar'

class Labels extends Component{
  render(){
    const {labels} = this.props
    var labelList = labels.map((label, index)=>{
      return  <Avatar
                style={{margin:5}}
                key={index}
                backgroundColor={label}
              />
    })

    return (
      <div>
        {labelList}
      </div>
    )
  }
}

export default Labels
