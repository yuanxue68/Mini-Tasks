var mongoose = require('mongoose');
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt'),
	SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
	username: { type: String, required: true, index: {unique:true} },
	password: { type: String, required: true }
});

UserSchema.pre('save', function(next){
	console.log("here")
	var user = this;

	if(!user.isModified('password')){
		return next();
	}

	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
		if(err){
			return next(err);
		}
		console.log("here")
		bcrypt.hash(user.password, salt, function(err, hash){
			if(err){
				return next();
			}

			user.password = hash;
			console.log("here")
			next();
		})
	})

});

module.exports = mongoose.model('User', UserSchema);
