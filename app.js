
var http = require('http'),
	  login_user = require('./middleware/login_user'),
    noGuest = require('./middleware/guest'),
    admin = require('./middleware/admin'),
    sessions = require('client-sessions'),
	  fs = require('fs'),
	  express = require('express'),
  	app = express(),
  	path = require('path'),
  	socket = require('socket.io'),
  	io = socket.listen(http);

app.set('port', process.env.PORT || 4001)
app.set('view engine', 'ejs');
app.set('views', './views');

// Enable sessions
app.use(sessions({
  cookieName: 'session',
  secret: 'somerandomstring',
  duration: 24*60*60*1000,  //How long the session will stay valid in ms
  activeDuration: 1000*60*5 //
}));

app.use(express.static(path.join(__dirname, "/views")));

var users = require('./controllers/user');
var homepage = require('./controllers/homepage');
var cards = require('./controllers/cards');
var deck = require('./controllers/deck');
var game = require('./controllers/game')
// Route path: /game/:id
// req.params: {"id":}

app.get('/players', admin, users.index);
app.get('/', homepage.index);
app.get('/logout', homepage.logout)

app.get('/login', homepage.getLogin);
app.post('/login', homepage.login);

app.get('/signup',homepage.getSignup)
app.post('/signup', homepage.signup);
app.get('/game', login_user, noGuest, deck.shuffleDeck);
app.get('/game/:id', game.addGame, deck.shuffleDeck);

app.listen(app.get('port'), function(){
  console.log('Express started. Server listening on port 4001. Press Ctrl-C to terminate');
});