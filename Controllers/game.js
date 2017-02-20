
"use strict"
var db = require('../db');
	// formidable = require('formidable'),
  // encryption = require("../database/encryption");
  // fs = require("fs-extra");


class Game{
	
	addGame(req, res){
    var id = req.route.path.split("/")[2];
    console.log("In addGame ",id);
    db.run("INSERT INTO game (winner) values (?)",'');
    res.redirect('/');
  }
}
module.exports = exports = new Game();
// nathanhbean.com/courses/cis580 ---- > lightbikes