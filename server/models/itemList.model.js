var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemList = new Schema({
	name: {type: String, required: true},
	boardId: {type: String, required: true},
	description: String
});

module.exports = mongoose.model("ItemList", ItemList);