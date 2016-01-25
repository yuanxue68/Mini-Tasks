var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var User = require('./../models/user.model');
var authConfig = require('./authConfig');
var jwt = require('jsonwebtoken');

passport.use(new LocalStrategy(function(username, password, done){
  User.findOne({"local.username":username}, function(err, user){
    if(!user){
      return done(null, false, { message: "Incorrect Password" });
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
  clientID: authConfig.facebookAuth.clientID,
  clientSecret: authConfig.facebookAuth.clientSecret,
  callbackURL: authConfig.facebookAuth.callbackURL
}, function(accessToken, refreshToken, profile, done){
  console.log(profile);
  User.findOne({"facebook.id":profile.id}, function(err, user){
    if(err) {
      return done(err);
    }

    if(user) {
      user.token = jwt.sign({
        facebookId: user.facebook.id
      },authConfig.SECRET,{
        expiresInMinutes: 1440
      });
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

        newUser.token = jwt.sign({
          facebookId: newUser.facebook.id
        },authConfig.SECRET,{
          expiresInMinutes: 1440
        });

        return done(null, newUser);
      })
    }
  });
}));

passport.use(new BearerStrategy(function(token, done){
  try {
    jwt.verify(token, authConfig.SECRET, function(err,decoded){
      if (err){
        return done(null, false);
      } else {
        var query;
        if(decoded.username){
          query = { username: decoded.username };
        } else {
          query = { "facebook.id": decoded.facebookId };
        }

        User.findOne(query, function (err, user) {
          if (err) { return done(err); }
          if (!user) {
            return done(null, false); 
          }
          else {
            return done(null, user); //allows the call chain to continue to the intented route
          }
        });
      }
    });
  }
  catch(err){
    return done(null, false); //returns a 401 to the caller
  }
}));