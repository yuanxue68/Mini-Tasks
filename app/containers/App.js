import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { pushState } from 'redux-router'
import Header from './../components/Header'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleDismissErrorClick = this.handleDismissErrorClick.bind(this)
    this.handleDismissNotificationClick = this.handleDismissNotificationClick.bind(this)
  }

  handleDismissErrorClick(e) {
    const { dispatch } = this.props
    dispatch(resetErrorMessage())
    e.preventDefault()
  }

  handleDismissNotificationClick(e) {
    const { dispatch } = this.props
    dispatch(resetNotificationMessage())
    e.preventDefault()
  }

  renderErrorMessage() {
    const { errorMessage } = this.props

    if (!errorMessage){
      return null
    }

    return (
      <div className="row">
        <div className="col-md-10 col-md-offset-1 warning">
          <span>{errorMessage}</span>
          <button type="button" className="close" onClick={ this.handleDismissErrorClick } >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    )
  }


  renderNotification() {
    const { notificationMessage } = this.props

    if (!notificationMessage){
      return null
    }

    return (
      <div className="row">
        <div className="col-md-10 col-md-offset-1 notification">
          <span>{notificationMessage}</span>
          <button type="button" className="close" onClick={ this.handleDismissNotificationClick } >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    )
  }

  render(){
    const {children} = this.props

    return(
      <div>
        <Header/>
        {children}
      </div>
    )
  }

}

function mapStateToProps (state) {
  return {
    errorMessage: state.errorMessage,
    notificationMessage: state.notificationMessage,
    authentication
  }
}

export default connect(mapStateToProps)(App)