var express = require('express');
var router = express.Router({mergeParams: true}); //so that it can get params from parent router
var passport = require('passport');
var util = require('util');
var mongoose = require('mongoose');
var Board = require('./../models/board.model');
var User = require('./../models/user.model');
var verifyBoardOwner = require('./apiUtils').verifyBoardOwner
var ObjectId = require('mongoose').Types.ObjectId

router.get('/', passport.authenticate('bearer', { session: false }), function(req, res){
	var id = req.params.boardId;
	req.userId = req.user._id.toString();

	verifyBoardOwner(id, req, res, function(){
		Board.findOne({_id: id}, function(err, board){
			if(!board){
				return res.status(400).send("an error has occured while getting board members");
			}
      
      var query = constructMembershipQuery(board.members, req.user._id);
      console.log(query)
			User.find({_id: {$in: query}}, function(err, result){
				if(err){
          console.log(err)
					return res.status(400).send("an error has occured while getting board members");
				} else {
					return res.json(result);
				}
			});
		});
	});
});

function constructMembershipQuery(membersId, ownerId){
	var query = [];
	membersId.forEach(function(id){
		query.push(new ObjectId(id))
	});
  query.push(ownerId)
	return query;
};

router.post('/', passport.authenticate('bearer', { session: false }), function(req, res){
	var id = req.params.boardId;
	req.userId = req.user._id.toString();
	var userId = req.body.userId;

	verifyBoardOwner(id, req, res, function(){
		User.findOne({_id: userId}, function(err, user){
			if(err){
				console.log(err);
				return res.status(400).send("an error has occured while adding board members");
			}

			if(!user){
				return res.status(400).send("This user does not exist");
			}

			Board.update({_id: id}, {$addToSet: {members: userId}}, function(err, result){
				if(err){
					return res.status(400).send("an error has occured while adding board members");
				} else {
					return res.json(user);
				}
			});

		});
	});
});

router.delete('/:userId', passport.authenticate('bearer', { session: false }), function(req, res){
	var id = req.params.boardId;
	req.userId = req.user._id.toString();
	var userId = req.params.userId;

	verifyBoardOwner(id, req, res, function(){
		Board.update({_id: id}, {$pull: {members: {$in: [userId]} }}, function(err, result){
			if(err){
				console.log(err);
				return res.status(400).send("an error has occured while deleting board members");
			} else {
				return res.json(result);
			}
		});
	});
});

module.exports = router;
