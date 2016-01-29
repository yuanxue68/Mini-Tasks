var express = require('express');
var router = express.Router();
var util = require('util');
var Board = require('./../models/board.model')

router.use(function(req, res, next){
	if(req.method === "POST"){
		req.checkBody("name","Your Board must have a name").notEmpty();
		req.checkBody("owner","Your Board must have a owner").notEmpty();
	} 

	var errors = req.validationErrors();
  if (errors) {
    res.status(400).send("There have been validation errors: " + util.inspect(errors));
  }

	next();
});

router.post("/", function(req, res){
	var newBoard = new Board(req.body);
	newBoard.save(function(err, board){
		if(err){
			res.status(400).send("an error has occured while creating your board");
		}

		res.json(board);
	})
});

router.get("/", function(req, res){
	var boardQuery = {};
	if(req.query.owner){
		boardQuery = {owner:req.query.owner};
	}
	Board.find(boardQuery, function(err, boards){
		if(err){
			res.status(400).send("an error has occured while getting your board");
		} else {
			res.json(boards);
		}
	});
});

router.put("/:id", function(req, res){
	var id = req.params.id;
	var newValues = {};

	if(req.body.name){
		newValues.name = req.body.name;
	}
	if(req.body.description){
		newValues.description = req.body.description;
	}

	Board.update({_id:id}, {$set: newValues}, function(err, board){
		if(err){
			res.status(400).send("an error has occured while editing your board");
		}

		res.json(board);
	});
});

module.exports = router;