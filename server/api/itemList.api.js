var express = require('express');
var router = express.Router({mergeParams: true}); //so that it can get params from parent router
var passport = require('passport');
var util = require('util');
var ItemList = require('./../models/itemList.model');
var Item = require('./../models/item.model');
var verifyBoardOwner = require('./apiUtils').verifyBoardOwner;

//this router this nested within itemList router
router.use(function(req, res, next){
	if(req.method === "POST"){
		req.checkBody("name","Your list must have a name").notEmpty();
		req.checkBody("boardId","Your list must belong to a board").notEmpty();
	} else if (req.method === 'PUT'){
    req.checkBody("archived", "must be boolean").isBoolean();
  } else if (req.method === 'GET'){
    req.checkQuery('page', 'must be number').optional().isInt();
    req.checkQuery('archived', 'must be boolean').optional().isBoolean();
  }

	var errors = req.validationErrors();
  if (errors) {
    res.status(400).send("There have been validation errors: " + util.inspect(errors));
  }

	next();
});

router.post('/', passport.authenticate('bearer', { session: false }), function(req, res){
	req.userId = req.user._id.toString();
	var boardId = req.params.boardId;

	if(boardId !== req.body.boardId){
		return res.status(401).send("you dont have the permission to modify this list");
	}

	verifyBoardOwner(boardId, req, res, function(){
    ItemList.find({boardId: req.body.boardId}).sort({pos:-1}).limit(1).exec(function(err, itemLists){
      if(err){
        return res.status(400).send("an error has occured while setting position")
      }
      
      var position;
      if(itemLists.length === 0){
        position = 65535;
      } else {
        position = (Math.ceil(itemLists[0].pos/65535)+1) * 65535;
      }

		  var newItemList = new ItemList(req.body);
      newItemList.pos = position;
      newItemList.save(function(err, itemList){
        if(err){
          return res.status(400).send("unable to save the list");
        } 
        res.json(itemList);
      });
    });
	});
});

router.get('/', passport.authenticate('bearer', { session: false }), function(req, res){
	req.userId = req.user._id.toString();
  var archived = req.query.archived || false;
  var skip = (req.query.page && req.query.page * 10) || 0;
  var limit = archived === 'true' ? 10 : Number.MAX_SAFE_INTEGER;
	var boardId = req.params.boardId;
	
  verifyBoardOwner(boardId, req, res, function(){
		ItemList.find({boardId: boardId, archived: archived })
    .sort({pos:1})
    .skip(skip)
    .limit(limit)
    .exec(function(err, itemLists){
			if(err){
				console.log(err);
        return res.status(400).send("an error has occured while getting the item lists");
			}
			var query = constructItemQuery(itemLists);
			Item.aggregate([
				{$match: query},
        {$sort: {pos:1}},
				{$group : { _id : "$itemListId", items: { $push: "$$ROOT" } } }
				])
        .exec(function(err, items){
				if(err){
          console.log(err);
					return res.status(400).send("an error has occured while getting the items");
				}
        Item.populate(items, {path: "items.assigner", model:'User'}, function(err, item){
          if(err){
            console.log(err);
            return res.status(400).send("an error has occured while getting the items")
          }
          res.json({
            itemLists: itemLists,
            items: items
          });
        });
			});
		});
	});
});

router.put('/:id', passport.authenticate('bearer', { session: false }), function(req, res){
	req.userId = req.user._id.toString();
	var boardId = req.body.boardId;
	var newValues = {};
	var id = req.params.id;
	newValues.name = req.body.name;
  newValues.archived = req.body.archived;
  newValues.pos = req.body.pos;

  verifyBoardOwner(boardId, req, res, function(){
		ItemList.update({_id: id}, {$set: newValues}, function(err, status){
			if(err){
				res.status(400).send("an error has occured while editing your board");
			} else {
				res.json(status);
			}
		});
	});
});

router.delete('/:id', passport.authenticate('bearer', { session: false }), function(req, res){
	req.userId = req.user._id.toString();
	var boardId = req.params.boardId;
	var id = req.params.id;

	verifyBoardOwner(boardId, req, res, function(){
		ItemList.findOne({_id:id}, function(err, doc){
			if(err){
				res.status(400).send("an error has occured while deleting your board");
			} else {
				doc.remove();
				res.json(doc);
			}
		});
	});
});

function constructItemQuery(itemLists){
	if(!Array.isArray(itemLists) || itemLists.length<1){
		return {};
	}

	var query = {$or: []};
	itemLists.forEach(function(list){
		query.$or.push({itemListId:list._id.toString()});
	});
	return query;
};


module.exports = router;
