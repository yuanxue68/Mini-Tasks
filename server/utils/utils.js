var jwt = require('jsonwebtoken');
var SECRET=require('./../config/authConfig').SECRET;

module.exports = {
  createToken: function(user){
    return jwt.sign({
      user: user
    }, SECRET, {
      expiresIn: 604800
    });
  },
  getUserId: function(user){
  	if(user.local.username){
  		return user.local.username;
  	} else {
  		return user.facebook.id;
  	}
  }
};