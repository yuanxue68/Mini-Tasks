var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Item = new Schema({
	name: {type: String, required: true},
	listId: {required: true, type: String},
	description: String,
	dueDate: Date
});

module.exports = mongoose.model('Item', Item);