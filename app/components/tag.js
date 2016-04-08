import React, {Component} from 'react'

class Tag extends Component {
  render(){
    const {color} = this.props
    return(
      <div className="tag" style={{backgroundColor: color}}>
      </div>
    )
  }
}

export default Tag
