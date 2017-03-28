// THIS FILE IS AN ATTEMPT TO BUILD THE APPLICATION WITH THE EXPRESS (NOT IN USE FOR NOW)
// IGNORE THIS FILE

const PORT = 4001;
// var http = require('http'),
var login_user = require('./middleware/login_user'),
    noGuest = require('./middleware/guest'),
    admin = require('./middleware/admin'),
    sessions = require('client-sessions'),
    fs = require('fs'),
    express = require('express'),
    app = express(),
    path = require('path');

    http = require('http').Server(app),
    socket = require('socket.io'),
    io = socket.listen(http);


var players = [];
var games = 0;
const Game = require('./controllers/gameplay');

app.set('port', process.env.PORT || 4001)
app.set('view engine', 'ejs');
app.set('views', './views');

// Enable sessions
app.use(sessions({
    cookieName: 'session',
    secret: 'somerandomstring',
    duration: 24 * 60 * 60 * 1000, //How long the session will stay valid in ms
    activeDuration: 1000 * 60 * 5
}));

app.use(express.static(path.join(__dirname, "/views")));

var users = require('./controllers/user');
var homepage = require('./controllers/homepage');
var cards = require('./controllers/cards');
var deck = require('./controllers/deck');
var game = require('./controllers/game')
var gameplay = require('./controllers/gameplay')
var html = fs.readFileSync('Views/lobby/game_room.html', {encoding: 'utf8'});
var js = fs.readFileSync('Controllers/gameplay.js', {encoding: 'utf8'});

function handleRequest(request, response) {
  switch(request.url) {
    case '/game':
    // case '/index.html':
    case '/game_room.html':
      response.setHeader('Content-Type', 'text/html');
      response.end(html);
      break;

    case '/gameplay.js':
      response.setHeader('Content-Type', 'text/js');
      response.end(js);
      break;
  }
}

app.get('/players', admin, users.index);
app.get('/', homepage.index);
app.get('/logout', homepage.logout)

app.get('/login', homepage.getLogin);
app.post('/login', homepage.login);

app.get('/signup', homepage.getSignup)
app.post('/signup', homepage.signup);
// app.get('/game', gameplay.Game);
app.get('/game', login_user, noGuest, game.addGame);
app.get('/dealer.js',function(){res.render('lobby/dealer.js')});


/* Handles a player connection */
io.on('connection', function(socket) {
    console.log('a user connected', players.length);
    socket.on('send message', function(data) {
        io.emit('new message', data);
        console.log('Message: ', data);
    });
    players.push(socket);

    // If we have 4 players, Launch a game instance
    if (players.length == 2) {
        new Game(io, players, games);
        players = [];
        games++;
    }
});

http.listen(app.get('port'), function() {
    console.log('Express started. Server listening on port 3000. Press Ctrl-C to terminate');
});