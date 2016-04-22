var express = require('express');
var router = express.Router(); 
var passport = require('passport');
var util = require('util');
var Item = require('./../models/item.model');
var verifyBoardOwner = require('./apiUtils').verifyBoardOwner;

router.use('/:itemId/comments', require('./comment.api'));

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

router.get('/:id', passport.authenticate('bearer', { session: false }), function(req, res){
	var id = req.params.id;
	req.userId = req.user._id.toString();

	Item.findOne({_id:id}, function(err, item){
		if(err){
			return res.status(400).send("an error has occured while getting your item");
		}
		verifyBoardOwner(item.boardId, req, res, function(){
			return res.json(item);
		});
	});
});

router.post('/', passport.authenticate('bearer', { session: false }), function(req, res){
	req.userId = req.user._id.toString();
	var boardId = req.body.boardId;
	verifyBoardOwner(boardId, req, res, function(){
    Item.find({itemListId:req.body.itemListId}).sort({pos:-1}).limit(1).exec(function(err, items){
      if(err){
        return res.status(400).send("an error has occured while setting position")
      }
      var position;
      if(items.length === 0){
        position = 65535;
      } else {
        position = (Math.ceil(items[0].pos/65535)+1) * 65535;
      }
      var newItem = new Item(req.body);
      newItem.pos = position;
      newItem.save(function(err, item){
        if(err){
          console.log(err);
          return res.status(400).send("an error has occured while creating items");
        } 
          return res.json(item);
      });

    });
	});
});

router.put('/:id', passport.authenticate('bearer', { session: false }), function(req, res){
	var id = req.params.id;
	req.userId = req.user._id.toString();

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
	newAttribute.name = body.name;
	newAttribute.description = body.description;
	newAttribute.dueDate = body.dueDate;
	newAttribute.labels = body.labels;
  newAttribute.assigner = body.assigner;
  newAttribute.pos = body.pos;
	return newAttribute;
}

router.delete('/:id', passport.authenticate('bearer', { session: false }), function(req, res){
	var id = req.params.id
	req.userId = req.user._id.toString();
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
