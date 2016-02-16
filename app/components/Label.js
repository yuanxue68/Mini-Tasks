import React, {Component} from 'react'

export default class Label extends Component{
	constructor(props){
		super(props)
		this.deleteMember = this.deleteMember.bind(this);
	}
	
	render(){
		return (<span className="label label-warning" onDoubleClick={this.deleteMember}>{this.props.name}, {this.props.id}</span>)
	}

	deleteMember(){
		const {onDeleteMember, router, id} = this.props
		onDeleteMember(router.params.boardId, id)
	}
}