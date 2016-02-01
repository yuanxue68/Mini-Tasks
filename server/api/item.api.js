var express = require('express');
var router = express.Router();
var passport = require('passport');
var util = require('util');
var Item = require('./../models/item.model');

router.use(function(req, res, next){
	if(req.method === "POST"){
		req.checkBody("name","Your list must have a name").notEmpty();
		req.checkBody("boardId","Your list must belong to a board").notEmpty();
	}

	var errors = req.validationErrors();
  if (errors) {
    res.status(400).send("There have been validation errors: " + util.inspect(errors));
  }

	next();
});

router.get('/', function(req, res){

});

router.post('/', function(req, res){

});

router.put('/', function(req, res){

});

router.delete('/' function(req, res){

});



module.exports = router;