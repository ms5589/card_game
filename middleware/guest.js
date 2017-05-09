"use strict"

function noGuests(req, res, next) {
  console.log('in noGuests->',req.user.username);
  if(req.user.username != "Guest") return next();
  else return res.render('login/login', {message: "You must sign in to proceed further", user: req.user});
}

module.exports = exports = noGuests;