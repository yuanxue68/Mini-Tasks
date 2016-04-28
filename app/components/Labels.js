import React, {Component} from 'React'
import Avatar from 'material-ui/lib/avatar'

class Labels extends Component{
  render(){
    const {labels, onRemoveLabel} = this.props
    var labelHeader = labels.length !== 0 ? <h4>Labels (Click To Remove)</h4> : null
    var labelList = labels.map((label, index)=>{
      return  <Avatar
                style={{margin:5, cursor: 'pointer'}}
                onTouchTap={onRemoveLabel.bind(null, label)}
                key={index}
                backgroundColor={label}
              />
    })

    return (
      <div>
        {labelHeader}
        {labelList}
      </div>
    )
  }
}

export default Labels
