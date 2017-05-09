
"use strict"

function admin_only(req, res, next) {
  console.log('in admin_only: ',req.user.username);
  if(req.user && req.user.admin) return next();
  else
  return res.render('lobby/admin_error', {error: "Sorry! Only admins have privileges to access this page", user: req.user}); 
  //res.sendStatus('403');
}

module.exports = exports = admin_only;