var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BoardSchema = new Schema({
	owner: {type: String, required: true},
	name: {type: String, required: true},
	description: String
});

module.exports = mongoose.model('Board', BoardSchema);