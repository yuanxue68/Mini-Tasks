var express = require('express');
var router = express.Router();
var util = require('util');
var passport = require('passport');
var Board = require('./../models/board.model');
var verifyBoardOwner = require('./apiUtils').verifyBoardOwner;

router.use('/:boardId/itemlists', require('./itemList.api'));
router.use('/:boardId/members', require('./members.api'));

router.use(function(req, res, next){
	if(req.method === "POST"){
		req.checkBody("name","Your Board must have a name").notEmpty();
		req.checkBody("owner","Your Board must have a owner").notEmpty();
	} else if (req.method === "PUT"){
    req.checkBody("name","Your Board must have a name").notEmpty();
	}

	var errors = req.validationErrors();
  if (errors) {
    return res.status(400).send("There have been validation errors: " + util.inspect(errors));
  }

	next();
});


router.post("/", passport.authenticate('bearer', { session: false }), function(req, res){

	req.userId = req.user._id.toString();
	if(req.userId !== req.body.owner){
		return res.status(400).send("you can not create a board under someone else's name");
	}
	var newBoard = new Board(req.body);
	newBoard.save(function(err, board){
		if(err){
			res.status(400).send("an error has occured while creating your board");
		} else {
			res.json(board);
		}
	});

});

router.get("/", passport.authenticate('bearer', { session: false }), function(req, res, next){
	req.userId = req.user._id.toString();
	if(req.userId !== req.query.owner){
		return res.status(400).send("you do not have permission to view this board");
	}
	Board.find({$or:[{owner:req.query.owner},{members:String(req.user._id)}]}).sort('_id').exec(function(err, boards){
		if(err){
			res.status(400).send("an error has occured while getting your board");
		} else {
			res.json(boards);
		}
	});
});

router.get("/:id", passport.authenticate('bearer', { session: false }), function(req, res, next){
	var id = req.params.id;
	req.userId = req.user._id.toString();

	verifyBoardOwner(id, req, res, function(){
		Board.findOne({_id: id}, function(err, board){
			if(err){
				res.status(400).send("an error has occured while getting your board");
			} else {
				res.json(board);
			}
		});
	});
});

router.put("/:id", passport.authenticate('bearer', { session: false }), function(req, res){
	req.userId = req.user._id.toString();
	var id = req.params.id;
	var newValues = {name:'', description:''};

	if(req.body.name){
		newValues.name = req.body.name;
	}
	if(req.body.description){
		newValues.description = req.body.description;
	}
	debugger
	verifyBoardOwner(id, req, res, function(){
		Board.update({_id:id}, {$set: newValues}, function(err, status){
			if(err){
				res.status(400).send("an error has occured while editing your board");
			} else {
				res.json(status);
			}
		});
	});
});

router.delete("/:id", passport.authenticate('bearer', { session: false }), function(req, res){
	req.userId = req.user._id.toString();
	var id = req.params.id;
	verifyBoardOwner(id, req, res, function(){
		Board.findOne({_id:id}, function(err, doc){
			if(err){
				res.status(400).send("an error has occured while deleting your board");
			} else {
				doc.remove();
				res.json(doc);
			}
		});
	})
});

module.exports = router;
