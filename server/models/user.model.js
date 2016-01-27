var mongoose = require('mongoose');
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt'),
	SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
	local:{
		username: { type: String, index: { unique: true } },
		password: { type: String }
	},
	facebook: {
    id:{ type: String, index: true },
    token: String,
  },
  name: String,
  discription: String,
  email: String
});

UserSchema.pre('save', function(next){
	var user = this;
	if(!user.isModified('local.password')){
		return next();
	}

	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
		if(err){
			return next(err);
		}

		bcrypt.hash(user.local.password, salt, function(err, hash){
			if(err){
				return next();
			}
			user.local.password = hash;
			next();
		})
	});

});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.local.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

UserSchema.methods.toJSON = function() {

	if(!this){
		return {};
	}
  var obj = this.toObject();
  if(obj.local)
  	delete obj.local.password;
  if(obj.facebook)
  	delete obj.facebook.token;
  return obj;
}

module.exports = mongoose.model('User', UserSchema);
