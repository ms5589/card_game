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
app.engine('js', require('ejs').renderFile);
app.set('view engine', 'ejs')

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
var gameController = require('./controllers/game')
var gameplay = require('./controllers/gameplay')

app.get('/players', admin, users.index);
app.get('/', homepage.index);
app.get('/logout', homepage.logout)

app.get('/login', homepage.getLogin);
app.post('/login', homepage.login);

app.get('/signup', homepage.getSignup)
app.post('/signup', homepage.signup);
// app.get('/game', gameplay.Game);
app.get('/game', login_user, noGuest, gameController.startGame);
app.get('/dealer.js', gameController.dealer);
app.get('*', homepage.display404);

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