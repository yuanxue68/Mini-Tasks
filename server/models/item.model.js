var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Item = new Schema({
	name: {required: true, type: String},
	itemListId: {required: true, type: String},
	boardId: {required: true, type: String},
	description: {type:String, default:''},
	dueDate: {type:String, default:'Thu Jan 01 2099 00:00:00 GMT-0400 (EDT)'},
	colorLabel: {type: String, default:'default'}
});

module.exports = mongoose.model('Item', Item);
