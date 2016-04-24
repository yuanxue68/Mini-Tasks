import React, {Component} from 'react'

class Tag extends Component {

	shouldComponentUpdate(nextProps){
    return this.props.color !== this.props.color
  }

  render(){
    const {color} = this.props
    return(
      <div className="tag" style={{backgroundColor: color}}>
      </div>
    )
  }
}

export default Tag
