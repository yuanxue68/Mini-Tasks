import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { pushState } from 'redux-router'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    const {children} = this.props

    return(
      <div className="body">
        {children}
      </div>
    )
  }

}

function mapStateToProps (state) {
  return {
    
  }
}

export default connect(mapStateToProps)(App)