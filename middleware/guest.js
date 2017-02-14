"use strict"

// Current user can NOT be a Guest
// Guest status is determined by the username (all guests
// share the username Guest)
function noGuests(req, res, next) {
  if(req.user.username != "Guest") return next();
  else return res.render('login/login', {message: "You must sign in to proceed further", user: req.user});
}

module.exports = exports = noGuests;