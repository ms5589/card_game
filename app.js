
var http = require('http'),
	fs = require('fs'),
	express = require('express'),
  	app = express(),
  	path = require('path'),
  	socket = require('socket.io'),
  	io = socket.listen(http);

app.set('port', process.env.PORT || 4001)
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(path.join(__dirname, "/views")));

var users = require('./controllers/user');
var homepage = require('./controllers/homepage');
var cards = require('./controllers/cards');
var deck = require('./controllers/deck');

app.get('/players', users.index);
app.get('/', homepage.index);
app.get('/signup', homepage.signup);
app.get('/game',deck.shuffleDeck);

app.listen(app.get('port'), function(){
  console.log('Express started. Server listening on port 4001. Press Ctrl-C to terminate');
});