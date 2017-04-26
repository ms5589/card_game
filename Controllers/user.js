
"use strict"
var db = require('../db'),
	  formidable = require('formidable'),
    encryption = require("../database/encryption");
  // fs = require("fs-extra");


class User{
	
	index(req, res){
		console.log("Controller > User > index()");
    	var users = db.all('SELECT * FROM users', function(err, item){
      	if(err) {
        	console.error(err);
        	return res.sendStatus(400);
      	}
      	res.render('users/user', {users: item});
    });
  }

  account(req, res){
    console.log("Controller > User > index()");
      var users = db.get('SELECT * FROM users WHERE username=?', req.user.username,
      function(err, item){
        if(err) {
          console.error(err);
          return res.sendStatus(400);
        }
        res.render('users/account', {users: item});
    });
  }
}

module.exports = exports = new User();