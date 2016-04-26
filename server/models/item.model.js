var mongoose = require('mongoose');
var Comment = require('./../models/comment.model')
var Schema = mongoose.Schema;

var Item = new Schema({
	name: {required: true, type: String},
	itemListId: {required: true, type: String, index: true},
	boardId: {required: true, type: String},
	labels: {type:Array, default:[]},
  description: {type:String, default:''},
	dueDate: {type:String },
  pos: {type: Number, required: true, index: true},
	colorLabel: {type: String, default:'default'},
  assigner: {type: Schema.Types.ObjectId, ref: 'User'}
});

Item.pre('remove', function(next){
	Comment.remove({itemId: this._id}).exec();
	next();
});

module.exports = mongoose.model('Item', Item);
