var express = require('express');
var router = express.Router({mergeParams: true}); //so that it can get params from parent router
var passport = require('passport');
var util = require('util');
var mongoose = require('mongoose');
var myUtils = require('./../utils/utils');
var Board = require('./../models/board.model');
var User = require('./../models/user.model');
var verifyBoardOwner = require('./apiUtils').verifyBoardOwner;

router.get('/', passport.authenticate('bearer', { session: false }), function(req, res){
	var id = req.params.boardId;
	req.userId = myUtils.getUserId(req.user);

	verifyBoardOwner(id, req, res, function(){
		Board.findOne({_id: id}, function(err, board){
			if(!board){
				return res.status(400).send("an error has occured while getting board members");
			}
			var query = constructMembershipQuery(board.members);
			console.log("query");
			console.log(query);
			if(!board.members || board.members.length == 0){
				return res.json([]);
			}
			User.find({query}, function(err, result){
				if(err){
					return res.status(400).send("an error has occured while getting board members");
				} else {
					return res.json(result);
				}
			})
		});
	});
});

function constructMembershipQuery(membersId){
	var query = {$or:[]};
	membersId.forEach(function(id){
		query.$or.push({"_id": mongoose.Types.ObjectId(id)})
	});
	return query;
};

router.post('/', passport.authenticate('bearer', { session: false }), function(req, res){
	var id = req.params.boardId;
	req.userId = myUtils.getUserId(req.user);
	var userId = req.body.userId;

	console.log("nody");
	console.log(req.body);

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
	req.userId = myUtils.getUserId(req.user);
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