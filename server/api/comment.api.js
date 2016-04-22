var express = require('express');
var router = express.Router({mergeParams: true}); //so that it can get params from parent router
var passport = require('passport');
var Comment = require('./../models/comment.model');
var Item = require('./../models/item.model');
var verifyBoardOwner = require('./apiUtils').verifyBoardOwner;
var uitl = require('util');

router.use(function(req, res, next){
  if(req.method === 'POST'){
    req.checkBody("content", "comment content cant be empty").notEmpty();
    req.checkBody("owner", "comment must have an owner").notEmpty();
    req.checkBody("itemId", "comment must have an itemId").notEmpty();
  }

  var errors = req.validationErrors();
  if(errors) {
    return res.status(400).send("There are some validation errors" + util.inspect(errors));
  }
  next();
});

router.post('/', passport.authenticate('bearer', { session: false }), function(req, res){
  req.userId = req.user._id.toString();
  Item.find({_id: req.body.itemId}, function(err, items){
    if(err){
      return res.status(400).send("An error has occured while trying to get items");
    }
    if(items.length === 0){
      return res.status(400).send("item does not exist"); 
    }

    verifyBoardOwner(items[0].boardId, req, res, function(){
      newComment = new Comment(req.body);
      newComment.postedOn = new Date();
      newComment.save(function(err, comment){
        if(err){
          console.log(err);
          res.status(400).send("an error has occured while saving comment");
        } else {
          comment = comment.toObject();
          comment.owner = {};
          comment.owner._id = req.user._id;
          comment.owner.name = req.user.name;
          res.json(comment);
        }
      });
    });
  });
});

//TODO: move item route into board so i dont have to query item
router.get('/', passport.authenticate('bearer', { session: false }), function(req, res){
  req.userId = req.user._id.toString();
  Item.find({_id: req.params.itemId}, function(err, items){
    if(err){
      return res.status(400).send("an error has occured while tryig to get items");
    }
    if(items.length === 0){
      return res.status(400).send('item does not exist');
    }
    verifyBoardOwner(items[0].boardId, req, res, function(){
      Comment.find({itemId: req.params.itemId}).populate('owner', '_id name').exec(function(err, comments){
        if(err){
          return res.status(400).send("an error has occured while getting comments");
        }
        res.json(comments);
      });
    });
  });
});

router.delete('/:id', passport.authenticate('bearer', { session: false}), function(req, res){
  req.userId = req.user._id.toString();
  Comment.findOne({_id: req.params.id}, function(err,comment){
    if(err){
      return res.status(400).send("an error has occured while findinf comment");
    }
    if(req.userId !== comment.owner.toString()){
      return res.status(401).send("do not have permission to delete this comment");
    }

    comment.remove(function(err, status){
      if(err){
        return res.status(400).send("an error has occured while deleting comment");
      }
      res.json(status);
    });
  });
});

module.exports = router;
