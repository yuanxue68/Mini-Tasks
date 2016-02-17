var Board = require('./../models/board.model');

module.exports = {
	//check if the board is owned by the logged in user
	verifyBoardOwner: function(id, req, res, cb){
		Board.findById(id, function(err, board){
			console.log(board);
			if(err){
				res.status(400).send("an error has occured while editing your board");
			} else if(!board || (board.owner !== req.userId && board.members.indexOf(String(req.user._id)) === -1)){
				debugger
				res.status(401).send("you dont have the permission to edit this board");
			} else {
				cb();
			}
		});
	}
}