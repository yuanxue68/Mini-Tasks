var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Item = new Schema({
	name: {required: true, type: String},
	itemListId: {required: true, type: String},
	boardId: {required: true, type: String},
	description: String,
	dueDate: Date
});

module.exports = mongoose.model('Item', Item);