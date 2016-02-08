var mongoose = require('mongoose');
var ItemList = require('./../models/itemList.model');
var Item = require('./../models/item.model');
var Schema = mongoose.Schema;

var BoardSchema = new Schema({
	owner: {type: String, required: true},
	name: {type: String, required: true},
	description: String
});

BoardSchema.pre('remove', function(next){
	ItemList.remove({boardId: this._id}).exec();
	Item.remove({boardId: this._id}).exec();
	next();
});

module.exports = mongoose.model('Board', BoardSchema);