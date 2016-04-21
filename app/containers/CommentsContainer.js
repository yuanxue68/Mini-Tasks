import React, {Component} from 'react'
import {connect} from 'react-redux'
import Comments from './../components/Comments'

class CommentsContainer extends Component{
  constructor(props){
    super(props)
  }

  render(){
    const comments = ["hi", 'hey', 'Sup']
    return(
      <div style={{padding:30}}>
        <Comments comments={comments}/>
      </div>
    )  
  }
}

function mapStateToProps(state){
  return {
    comments: state.comments
  }
}

export default connect(mapStateToProps)(CommentsContainer)
