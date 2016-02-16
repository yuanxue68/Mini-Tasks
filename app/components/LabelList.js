import React, {Component} from 'react'
import Label from './Label'

export default class LabelList extends Component{
	render(){
		const {router, onDeleteMember, labelList} = this.props
		var labels = labelList.map(function(label){
			return <Label name={label.name} id={label._id} onDeleteMember={onDeleteMember} router={router}/>
		})
		return (
			<div>
				<h4>{this.props.labelList.name}</h4>
				{labels}
			</div>
		)
	}
}