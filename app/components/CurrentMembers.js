import React, {Component} from 'react'
import UserPopover from './../containers/UserPopover'

class CurrentMembers extends Component {
  render(){
    const members = this.props.members.map((user)=>{
      return <UserPopover key={user._id} user={user}/>
    })
    return (
      <div>  
        <h4 id="currentMember"><i className="fa fa-users"></i> Current Members</h4>
        <div className="text-center">
          {members}
        </div> 
      </div>   
    )
  }
}

export default CurrentMembers
