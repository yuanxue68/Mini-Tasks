import React, {Component} from 'react'

class Tag extends Component {

	shouldComponentUpdate(nextProps){
    return this.props.color !== this.props.color
  }

  render(){
    const {color} = this.props
    return(
      <div style={{
        backgroundColor: color,
        display: 'inline-block',
        height: 10,
        width: '20%'
      }}>
      </div>
    )
  }
}

export default Tag
