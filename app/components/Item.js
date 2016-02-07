import React, {Component} from 'react'

export default class Item extends Component{
	render(){
		const {item} = this.props
		return(
			<div>
				<button type="button" className="close" onClick={this.props.onDeleteItem.bind(null, item._id, item.itemListId)}><span>&times;</span></button>
				{this.props.item.name}
			</div>
		)
	}
}