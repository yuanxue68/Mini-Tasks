import React, {Component} from 'react'
import {connect} from 'react-redux'
import UserSettingForm from './../components/UserSettingForm'
import {editUser} from './../actions/UserActions'
import {getCookie} from './../utils/Utils'

class UserSettingContainer extends Component {
  constructor(props){
    super(props)
    this.onEditUser = this.onEditUser.bind(this)
  }

  onEditUser(event){
    event.preventDefault()
    var newUserInfo = {}
    const token = getCookie('yulloToken')
    const {dispatch} = this.props
    const {name, description, password, password_confirmation} = this.props.form.userSetting
    if(password.value != password_confirmation.value || !name.value){
      return 
    }
    newUserInfo.name = name.value
    newUserInfo.description = description.value
    newUserInfo._id = this.props.authentication.userInfo._id
    if(password.value && password_confirmation.value){
      newUserInfo.password = password.value
      newUserInfo.password_confirmation = password_confirmation.value 
    } 

    dispatch(editUser(newUserInfo, token))
  }

  render(){
    const {authentication} = this.props
    const initial = {
      initialValues: {name: authentication.userInfo.name, description: authentication.userInfo.description},
    }
    return (
      <div className="container text-center">
        {<UserSettingForm 
          {...initial}
          onEditUser={this.onEditUser} 
          userInfo={authentication.userInfo}/>}
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    authentication: state.authentication,
    form: state.form
  }
}

export default connect(mapStateToProps)(UserSettingContainer)
