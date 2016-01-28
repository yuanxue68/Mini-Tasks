var passport = require('passport');
var jwt = require('jsonwebtoken');
var express = require('express');
var utils=require('./../utils/utils');

var router = express.Router();
var SECRET=require('./../config/authConfig').SECRET;

router.post("/local", function(req, res, next){
  passport.authenticate(['bearer','local'], function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      return res.status(401).send("Incorrect password");
    }

    //user has authenticated correctly thus we create a JWT token 
    var token = utils.createToken(user);
    res.cookie("yulloToken",token).json(user);

  })(req, res, next);
});

router.get('/facebook', 
  passport.authenticate('facebook', { session: false, scope: ["email"] })
);

router.get('/facebook/callback', passport.authenticate('facebook', {session: false, failureRedirect : '/'}), function(req, res) {
 // The token we have created on FacebookStrategy above 
 var token = req.user.token;
 res.cookie("yulloToken",token).redirect('/');
});

module.exports = router;
