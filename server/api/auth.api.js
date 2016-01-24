var passport = require('passport');
var jwt = require('jsonwebtoken');
var express = require('express');

var router = express.Router();
var SECRET=require('./../config/authConfig').SECRET;

router.post("/local", function(req, res, next){
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      return res.status(401).json({ error: 'message' });
    }

    //user has authenticated correctly thus we create a JWT token 
    var token = jwt.sign(user, SECRET, {
          expiresInMinutes: 1440
        });
    res.json({ token : token });

  })(req, res, next);
});

router.get('/auth/facebook', 
  passport.authenticate('facebook', { scope : 'email' }
));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {session: false, failureRedirect : '/'}), function(req, res) {
 // The token we have created on FacebookStrategy above 
 var token = req.user.my_token;
 res.json({ token: token });
});

module.exports = router;
