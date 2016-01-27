var express = require('express');
var	mongoose = require('mongoose');
var passport = require('passport');
var	User = require('./../models/user.model');
var	util = require('util');
var	errorMsg = require('./../constants/errors.constants').userResourceErrors;

var	router = express.Router();
//validate params
router.use(function(req, res, next){
	if(req.method === "POST"){
		req.checkBody("local.username","empty user name").notEmpty();
		req.checkBody("name","empty display name").notEmpty();
		req.checkBody("local.password","password need to be 6+ characters").notEmpty().len(6);
	} else if(req.method === "GET"){

	}

	var errors = req.validationErrors();
  if (errors) {
    res.send("There have been validation errors: " + util.inspect(errors), 400);
  }

	next();
});

router.post("/",function(req,res){
	var newUser = new User(req.body);

	newUser.save(function(err, user){
		if(err){
			res.send(errorMsg.USER_CREATION_ERROR);
		}
		res.send(user);
	});

});

router.get("/", passport.authenticate('bearer', { session: false }), function(req,res){
	res.send("authenticated");
});

module.exports = router;