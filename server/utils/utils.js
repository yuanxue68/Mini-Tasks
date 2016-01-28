var jwt = require('jsonwebtoken');
var SECRET=require('./../config/authConfig').SECRET;

module.exports = {
  createToken: function(user){
    return jwt.sign({
      user: user
    }, SECRET, {
      expiresIn: 604800
    });
  }
};