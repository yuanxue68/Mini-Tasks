var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  owner: {type: Schema.ObjectId, required: true, ref: 'User'},
  itemId: {type: String, required: true, index: true},
  postedOn: {type: Date, required: true},
  content: {type: String, required: true}
});

module.exports = mongoose.model('Comment', CommentSchema);
