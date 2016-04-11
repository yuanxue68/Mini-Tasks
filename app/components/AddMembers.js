import React, {Component} from 'react'
import UserSearchForm from './UserSearchForm'
import UserList from './UserList'

class AddMembers extends Component {
  render(){ 
    const {onSearchUsers, onCreateMember, onClearSearch, userSearchResult} = this.props
    return(
      <div>
        <UserSearchForm onClearSearch={onClearSearch} onSearchUsers={onSearchUsers}/>
        <UserList users={userSearchResult} onClick={onCreateMember}/>
      </div>
    )

  }
}

export default AddMembers
