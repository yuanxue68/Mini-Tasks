var express = require('express');
var	mongoose = require('mongoose');
var passport = require('passport');
var	User = require('./../models/user.model');
var	util = require('util');
var utils=require('./../utils/utils');
var	errorMsg = require('./../constants/errors.constants').userResourceErrors;
var ObjectId = require('mongoose').Types.ObjectId; 

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
    res.status(400).send("There have been validation errors: " + util.inspect(errors));
  }

	next();
});

router.post("/",function(req,res){
	var newUser = new User(req.body);

	newUser.save(function(err, user){
		if(err){
			if(err.code === 11000){
				return res.status(400).send(errorMsg.DUPLICATE_USER_ERROR);
			} else{
				return res.status(400).send(errorMsg.USER_CREATION_ERROR);
			}
		}
    var token = utils.createToken(user);
		res.cookie("yulloToken",token).send(user);
	});

});

router.get("/", passport.authenticate('bearer', { session: false }), function(req,res){
  try {
    var searchParam = req.query.searchParam;
    var likeSearchParam = new RegExp(".*"+searchParam+".*", "i");
  } catch (e){
    console.log(e)
    return res.status(400).send("not a valid searchParam")
  }

  User.find({name: likeSearchParam}, {_id: 1, name: 1})
    .limit(10).exec(function(err, doc){
    if(err){
      console.log(err)
      return res.status(400).send("An error has occured while searching users");
    }
    // try find by _id if no user was found by name
    if(doc.length <= 0 && utils.validateMongoId(searchParam)){
      User.find({_id: new ObjectId(searchParam)}, {_id: 1, name: 1})
        .limit(10).exec(function(err, doc){
        if(err){
          return res.json([]);
        } else {
          return res.json(doc);
        }
      });
    } else {
      return res.json(doc);
    }    
  });
});

module.exports = router;
