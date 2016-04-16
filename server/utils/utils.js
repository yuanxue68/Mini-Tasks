var jwt = require('jsonwebtoken');

module.exports = {
  createToken: function(user){
    return jwt.sign({
      user: user
    }, process.env.SECRET, {
      expiresIn: 604800
    });
  },
  validateMongoId: function(id){
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      return true;
    }
    return false;
  }
};
