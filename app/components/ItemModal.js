import React, {Component} from 'react'
import {closeModal} from './../utils/Utils'

export default class ItemModal extends Component {
	render(){
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
                <input id="itemName" className="form-control" type="text" placeholder="Item Name"/>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea id="itemDescription" className="form-control" row="5" type="text" placeholder="What is this item about?"/>
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label>Due Date</label>
                  <input id="itemDueDate" className="form-control" type="date" placeholder="List Name"/>
                </div>
                <div className="form-group col-md-6">
                  <label>Color Label</label>
                  <select id="userRole" className="form-control">
                    <option >Deafult</option>
                    <option >Success</option>
                    <option >Info</option>
                    <option >Primary</option>
                    <option >Warning</option>
                    <option >Danger</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-info" >Save</button>
              <button type="button" className="btn btn-danger" onClick={closeModal.bind(null,"#itemInfoModal")}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
		)
	}
}