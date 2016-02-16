import React, {Component} from 'react'
import {closeModal} from './../utils/Utils'

export default class ItemModal extends Component {
  constructor(props){
    super(props)
    this.inputChange = this.inputChange.bind(this)
    this.editItem = this.editItem.bind(this)
  }

	render(){
    const {itemInfo} = this.props
		return(
      <div className="modal fade" id="itemInfoModal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close"><span onClick={closeModal.bind(null,"#itemInfoModal")}>&times;</span></button>
              <h4 className="modal-title">Item Detail</h4>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Name</label>
                <input id="itemName" className="form-control" type="text" value={itemInfo.name} onChange={this.inputChange} placeholder="Item Name"/>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea id="itemDescription" className="form-control" row="5" type="text" value={itemInfo.description} onChange={this.inputChange}  placeholder="What is this item about?"/>
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label>Due Date</label>
                  <input id="itemDueDate" className="form-control" type="date" onChange={this.inputChange} value={itemInfo.dueDate}/>
                </div>
                <div className="form-group col-md-6">
                  <label>Color Label</label>
                  <select id="itemColorLabel" className="form-control" onChange={this.inputChange} value={itemInfo.colorLabel}> 
                    <option value="success">success</option>
                    <option value="default">default</option>
                    <option value="info">info</option>
                    <option value="primary">primary</option>
                    <option value="warning">warning</option>
                    <option value="danger">danger</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-info" onClick={this.editItem}>Save</button>
              <button type="button" className="btn btn-danger" onClick={closeModal.bind(null,"#itemInfoModal")}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
		)
	}

  editItem(){
    var itemInfo = JSON.parse(JSON.stringify(this.props.itemInfo))//deep copy
    this.props.onEditItem(itemInfo)
    closeModal("#itemInfoModal")
  }

  inputChange() {
    var itemInfo = JSON.parse(JSON.stringify(this.props.itemInfo))//deep copy
    itemInfo.name = document.getElementById("itemName").value
    itemInfo.description = document.getElementById("itemDescription").value
    itemInfo.dueDate = document.getElementById("itemDueDate").value
    itemInfo.colorLabel = document.getElementById("itemColorLabel").value
    this.props.onPopulateItemToModal(itemInfo)
  }
}