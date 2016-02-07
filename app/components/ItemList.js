import React, {Component} from 'react'

export default class ItemLists extends Component{
	constructor(props){
		super(props)
	}

	render(){
		const {itemList} = this.props
		
		return (
			<div className ="col-md-3 well">
				<div>{itemList.name}</div>
			</div>
		)
	}
}