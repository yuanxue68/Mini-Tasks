var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var User = require('./../models/user.model');
//var authConfig = require('./authConfig');
var jwt = require('jsonwebtoken');
var utils=require('./../utils/utils');

passport.use(new LocalStrategy(function(username, password, done){
  User.findOne({"local.username":username}, function(err, user){
    if(!user){
      return done(null, false, "Incorrect Password");
    }

    user.comparePassword(password, function(err, match){
      if(err) {
        return done(err);
      }
      if(!match) {
        return done(null, false, { message: "Incorrect Password" });
      } else {
        return done(null, user);
      }
    })
  })
}));

passport.use(new FacebookStrategy({
  clientID: process.env.facebookClientID,
  clientSecret: process.env.facebookClientSecret,
  callbackURL: process.env.facebookCallbackURL
}, function(accessToken, refreshToken, profile, done){
  User.findOne({"facebook.id":profile.id}, function(err, user){
    if(err) {
      return done(err);
    }

    if(user) {
      user.token = utils.createToken(user);
      return done(null, user);
    } else {
      var user = new User();

      user.facebook.id = profile.id;
      user.facebook.token = accessToken;
      user.name = profile.displayName;

      user.save(function(err, newUser){
        if(err){
          return done(err);
        }

        newUser.token = utils.createToken(user);

        return done(null, newUser);
      })
    }
  });
}));

passport.use(new BearerStrategy(function(token, done){
  try {
    jwt.verify(token, process.env.SECRET, function(err,decoded){
      if (err){
        return done(null, false);
      } else {
        var query;
        if(decoded.user && decoded.user.local && decoded.user.local.username){
          query = { "local.username": decoded.user.local.username };
        } else if(decoded.user && decoded.user.facebook && decoded.user.facebook.id){
          query = { "facebook.id": decoded.user.facebook.id };
        } else {
          return done(null, false);
        }
        User.findOne(query, function (err, user) {
          if (err) { return done(err); }
          if (!user) {
            return done(null, false); 
          }
          else {
            return done(null, user.toJSON()); //allows the call chain to continue to the intented route
          }
        });
      }
    });
  }
  catch(err){
    return done(null, false); //returns a 401 to the caller
  }
}));