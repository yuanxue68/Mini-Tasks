import React, {Component} from 'react'
import LabelList from './LabelList'
import {Link} from 'react-router'

export default class MemberPage extends Component{
	constructor(props){
		super(props)
		this.createMember = this.createMember.bind(this)
	}
	render(){
		const {members, router, onDeleteMember} = this.props
		return(
			<div>
				<div className="clearfix" >
				    <Link className="btn btn-info pull-left" to={"board/"+this.props.params.boardId}><i className="fa fa-long-arrow-left"></i> Back to Board</Link>
				</div>
				<div className="form-group">
					<label htmlFor="">Add Member By ID (double click tag to remove from board)</label>
					<div className="input-group">
			      <input type="text" id='memberId' className="form-control" placeholder="UserID"/>
			      <span className="input-group-btn">
			        <button className="btn btn-success" onClick={this.createMember}>Add !</button>
			      </span>
			    </div>
				</div>
				<LabelList labelList={members} router={router} onDeleteMember={onDeleteMember}  name="Members"/>
			</div>
		)
	}

	createMember(){
		var userId = document.getElementById('memberId').value
		if(!userId.trim())
			return
		userId = {
			userId
		}
		document.getElementById("memberId").value = ''
		this.props.onCreateMember(this.props.params.boardId, userId)
	}
}