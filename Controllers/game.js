"use strict"
var db = require('../db');

class Game{	
	startGame(req, res){
    console.log("Controller > Game > startGame()");
    res.render('lobby/game_room');    
  }
  dealer(req, res){
    console.log("Controller > Game > dealer()");
    res.render('/dealer.js');
  }
}

module.exports = exports = new Game();