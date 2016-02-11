var express = require('express');
var router = express.Router(); //so that it can get params from parent router
var passport = require('passport');
var util = require('util');
var Item = require('./../models/item.model');
var myUtils = require('./../utils/utils');
var verifyBoardOwner = require('./apiUtils').verifyBoardOwner;

router.use(function(req, res, next){
	if(req.method === "POST"){
		req.checkBody("name","Your item must have a name").notEmpty();
		req.checkBody("boardId","Your item must belong to a board").notEmpty();
		req.checkBody("itemListId","Your item must belong to a board").notEmpty;
	}

	var errors = req.validationErrors();
  if (errors) {
    return res.status(400).send("There have been validation errors: " + util.inspect(errors));
  }

	next();
});

router.get('/', function(req, res){

});

router.post('/', passport.authenticate('bearer', { session: false }), function(req, res){
	req.userId = myUtils.getUserId(req.user);
	var boardId = req.body.boardId;
	verifyBoardOwner(boardId, req, res, function(){
		var newItem = new Item(req.body);
		newItem.save(function(err, item){
			if(err){
				console.log(err);
				return res.status(400).send("an error has occured while creating items");
			} 
				return res.json(item);
		})
	});
});

router.put('/:id', passport.authenticate('bearer', { session: false }), function(req, res){
	var id = req.params.id
	req.userId = myUtils.getUserId(req.user);

	Item.findOne({_id:id}, function(err, item){
		if(err){
			return res.status(400).send("an error has occured while deleting your item");
		}
		verifyBoardOwner(item.boardId, req, res, function(){
			var newAttribute = createSetObj(req.body);
			Item.update({_id:id}, {$set: newAttribute}, function(err, status){
				if(err){
					res.status(400).send("an error has occured while deleting your item");
				} else {
					res.json(status);
				}
			});
		});
	});
});

function createSetObj(body){
	var newAttribute = {};
	newAttribute.itemListId = body.itemListId;
	newAttribute.boardId = body.boardId;
	newAttribute.name = body.name;
	return newAttribute;
}

router.delete('/:id', passport.authenticate('bearer', { session: false }), function(req, res){
	var id = req.params.id
	req.userId = myUtils.getUserId(req.user);
	Item.findOne({_id:id}, function(err, item){
		if(err){
			return res.status(400).send("an error has occured while deleting your item");
		}
		verifyBoardOwner(item.boardId, req, res, function(){
			Item.remove({_id:id}, function(err, status){
				if(err){
					res.status(400).send("an error has occured while deleting your item");
				} else {
					res.json(status);
				}
			});
		});
	});
});



module.exports = router;