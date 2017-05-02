"use strict"
var db = require('../db'),
    formidable = require('formidable'),
    encryption = require("../database/encryption");


class Home{

    index(req, res){
      console.log("Controller > User > index()");
      res.render('login/index');
    }
  	
  	logout(req, res){
  		req.session.reset();
  		console.log("Controller > homepage.js > logout()");
  		res.redirect('/login');
  	}

  	getLogin(req, res){
  		req.session.reset();
  		console.log("Controller > homepage.js > login()");
		  res.render("login/login"), {layout: "index"};
  	}

  	login(req, res, next) {
      req.session.reset();
      //res.render("session/delete", {user: {username: "Guest"}});
      var form = new formidable.IncomingForm();
      form.parse(req, (err, fields, files) => {
          if(err) return res.sendStatus(500);
          db.get("SELECT * FROM users WHERE username = ?", fields.username, (err, user) => {
          if(err) return res.render('login/login_error', {message: "Username/Password not found.  Please try again.", user: req.user});
          if(!user) return res.render('login/login_error', {message: "Username/Password not found.  Please try again.", user: req.user});
          if(user.password_digest != encryption.digest(fields.password + user.salt)) return res.render('login/login_error', {message: "Username/Password not found.  Please try again.", user: req.user});
          req.session.user_id = user.id;
          return res.redirect('/game');
          });
      });
    }
   	
   	getSignup(req, res){
   	  req.session.reset();
		  console.log("Controller > homepage.js > getSignup()");
		  res.render("login/signup"), {layout: "index"};
   	}

  	signup(req,res,next) {
  	 console.log("Controller > homepage.js > signup()");
      var salt = encryption.salt();
      var form = new formidable.IncomingForm();
  	  req.session.reset();
      form.parse(req, (err, fields, files) => {
          if(err) return res.sendStatus(500);
          console.log("username: ",fields.username," Pwrd", fields.password);
          db.run("INSERT INTO users (username, fname, lname, email, coins, admin, blocked, password_digest, salt) values (?,?,?,?,?,?,?,?,?)",
          fields.username,
          fields.fname,
          fields.lname,
          fields.email,
          25000,
          false,
          false,
          encryption.digest(fields.password + salt),
          salt, function(err, user) {
          if(err) {console.log(err); return res.render('login/signup_error', {message: "Username is already taken. Try other username.", user: req.user});}
          else { return res.render('login/login', {message: "Account has been created, Please login now.", user: req.user});}
          return res.redirect('/login');
        });
      });
    }

    display404(req, res){
      console.log("Controller > homepage.js > display404() for", req.url);      
      // var users = db.get('SELECT * FROM users WHERE username=?', req.user.username,
      //   function(err, item){
      //     if(err) {
      //       console.error(err);
      //       return res.sendStatus(400);
      //     }
          // res.render('/error', {users: item});
      res.render('error');
      // });
    }
}

module.exports = exports = new Home();