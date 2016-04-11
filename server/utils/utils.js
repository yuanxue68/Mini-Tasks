var jwt = require('jsonwebtoken');

module.exports = {
  createToken: function(user){
    return jwt.sign({
      user: user
    }, process.env.SECRET, {
      expiresIn: 604800
    });
  },
  getUserId: function(user){
  	if(user.local && user.local.username){
  		return user.local.username;
  	} else {
  		return user.facebook.id;
  	}
  },
  validateMongoId: function(id){
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      return true;
    }
    return false;
  }
};
