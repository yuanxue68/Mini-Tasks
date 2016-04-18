import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { pushState } from 'redux-router'
import Header from './../components/Header'
import { resetErrorMessage, resetNotificationMessage, userSignOut, userSignIn } from './../actions/RootActions'
import { getCookie } from './../utils/Utils'
import LoggedOutHome from './../components/LoggedOutHome'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleDismissErrorClick = this.handleDismissErrorClick.bind(this)
    this.handleDismissNotificationClick = this.handleDismissNotificationClick.bind(this)
  }

  componentWillMount(){
    const { dispatch, authentication } = this.props
    var token = getCookie('yulloToken')
    dispatch(userSignIn({}, token, false))
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
        <div className="col-md-10 col-md-offset-1 alert alert-danger">
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
        <div className="col-md-10 col-md-offset-1 alert alert-info">
          <span>{notificationMessage}</span>
          <button type="button" className="close" onClick={ this.handleDismissNotificationClick } >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    )
  }

  render(){
    const { dispatch, authentication, router} = this.props
    var header = authentication.authed ? <Header authentication={authentication} onUserSignOut={()=> dispatch(userSignOut())}/> : null
    var children = authentication.authed || router.location.pathname === "/login" ||
        router.location.pathname === "/signup"
        ? this.props.children : <LoggedOutHome/>
    return(
      <div>
        {header}
        <br/>
        {this.renderErrorMessage()}
        {this.renderNotification()}
        {children}
      </div>
    )
  }

}

function mapStateToProps (state) {
  return {
    errorMessage: state.errorMessage,
    notificationMessage: state.notificationMessage,
    authentication: state.authentication,
    router: state.router
  }
}

export default connect(mapStateToProps)(App)
