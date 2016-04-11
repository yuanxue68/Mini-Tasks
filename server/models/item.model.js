var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Item = new Schema({
	name: {required: true, type: String},
	itemListId: {required: true, type: String},
	boardId: {required: true, type: String},
	labels: {type:Array, default:[]},
  description: {type:String, default:''},
	dueDate: {type:String },
	colorLabel: {type: String, default:'default'},
  assigner: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Item', Item);
