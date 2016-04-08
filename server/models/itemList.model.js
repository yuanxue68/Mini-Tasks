var mongoose = require('mongoose');
var Item= require('./../models/item.model');
var Schema = mongoose.Schema;

var ItemList = new Schema({
	name: {type: String, required: true},
	boardId: {type: String, required: true},
	description: String,
  archived: {type: Boolean, default: false}
});

ItemList.pre('remove', function(next){
	debugger
	Item.remove({itemListId: this._id}).exec();
	next();
});

module.exports = mongoose.model("ItemList", ItemList);
