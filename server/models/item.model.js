var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Item = new Schema({
	name: {required: true, type: String},
	itemListId: {required: true, type: String},
	boardId: {required: true, type: String},
	description: {type:String, default:''},
	dueDate: {type:String, default:'2000-01-01'},
	colorLabel: {type: String, default:'default'}
});

module.exports = mongoose.model('Item', Item);