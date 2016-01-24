var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	User = require('./../models/user.model'),
	util = require('util');

//validate params
router.use(function(req, res, next){
	if(req.method === "POST"){
		req.checkBody("username","empty user name").notEmpty();
		req.checkBody("password","password need to be 6+ characters").notEmpty().len(6);
	} else if(req.method === "GET"){

	}

	var errors = req.validationErrors();
  if (errors) {
    res.send('There have been validation errors: ' + util.inspect(errors), 400);
  }

	next();
});

router.post('/',function(req,res){
	var newUser = new User(req.body);

	newUser.save(function(err, user){
		if(err){
			res.send(err);
		}
		res.send(user);
	});

});

module.exports = router;