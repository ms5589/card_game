
"use strict"
var db = require('../db');

class Home{
	index(req, res){
		console.log("Controller > homepage.js > index()");
		res.render("login/index"), {layout: "index"};
  	}
  	signup(req, res){
		console.log("Controller > homepage.js > signup()");
		res.render("login/signup"), {layout: "index"};
  	}
}

module.exports = exports = new Home();