"use strict"
var db = require('../db');

class Game{	
  
  startGame(req, res){
    console.log("Controller > Game > startGame()");
        
       if(req.user.coins<1000){
         res.render('lobby/nocoins');
       }
        
       else{
          db.run("UPDATE users SET coins=? WHERE username=?",
            req.user.coins-=1000,
            req.user.username,
            function(err){
              if(err) return console.err(err, "Error while updating table users."); 
          });
          var users = db.get('SELECT * FROM users WHERE username=?', req.user.username,
            function(err, item){
             if(err) {
               console.error(err);
               return res.sendStatus(400);
             }
            res.render('lobby/game_room', {users: item});
          });
       } 
  }
  
  dealer(req, res){
    console.log("Controller > Game > dealer()");
    res.render('/dealer.js');
  }
  
  ico(req, res){
  	console.log("Controller > Game > ico()");
  	res.render('./spades.ico');
  }
}

module.exports = exports = new Game();