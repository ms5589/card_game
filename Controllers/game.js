
"use strict"
var db = require('../db');
	// formidable = require('formidable'),
  // encryption = require("../database/encryption");
  // fs = require("fs-extra");


class Game{
	
	startGame(req, res){
    // var id = req.route.path.split("/")[2];
    console.log("startGame()");
    res.render('lobby/game_room');
    // db.run("INSERT INTO game (winner) values (?)",'');
    // var username = db.get("SELECT * FROM users WHERE id = ?", req.session.user_id, function(err, username){
    //   if(err) console.log(err, "Error while searching table users.");
    //   username = username.username;
    //   // res.render('lobby/game_room', {username: username.username});
    //   console.log("Username: ",username);
    //   });

    
  }

  dealer(req, res){
    res.render('lobby/dealer.js');
  }
}
module.exports = exports = new Game();
// nathanhbean.com/courses/cis580 ---- > lightbikes