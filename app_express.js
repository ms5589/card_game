var sessions = require('client-sessions'),
    fs = require('fs'),
    express = require('express'),
    app = express(),
    path = require('path'),
    http = require('http').Server(app),
    socket = require('socket.io'),
    favicon = require('serve-favicon'),
    io = socket.listen(http);

var plyr = require('./Controllers/player');
var deck = require('./Controllers/deck');
var players = [];
var games = 0;
const Game = require('./controllers/gameplay');

app.set('port', process.env.PORT || 4002)
app.engine('js', require('ejs').renderFile);
// app.engine('image', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/spades.ico'));
app.use(express.static(path.join(__dirname, "/Views")));

// Enable sessions
app.use(sessions({
    cookieName: 'session',
    secret: 'somerandomstring',
    duration: 24 * 60 * 60 * 1000, //How long the session will stay valid in ms
    activeDuration: 1000 * 60 * 5
}));

var users = require('./controllers/user');
var homepage = require('./controllers/homepage');
var gameController = require('./controllers/game')
var gameplay = require('./controllers/gameplay');
var login = require('./middleware/login_user');
var noGuest = require('./middleware/guest');
var adminOnly = require('./middleware/admin_Only');

// GET ROUTES
app.get('/', homepage.index);
app.get('/players', login, adminOnly, users.index);
app.get('/account', login, noGuest, users.account);
app.get('/logout', homepage.logout)
app.get('/login', homepage.getLogin);
app.get('/signup', homepage.getSignup)
app.get('/game', login, noGuest, gameController.startGame);
app.get('/credits', homepage.credit);
app.get('/dealer.js', gameController.dealer);
app.get('/deck', deck.shuffleDeck);
app.get('*', homepage.display404);

// POST ROUTES
app.post('/login', homepage.login);
app.post('/signup', homepage.signup);

/* Handles a player connection */
io.on('connection', function(socket) {
    
    console.log('a user connected', players.length);

    players.push(socket);

    // If we have 2 players, Launch a game instance
    if (players.length == 2) {
        new Game(io, players, games);
        players = [];
        games++;
    }
});

http.listen(app.get('port'), function() {
    console.log('Express started. Server listening on port 4002. Press Ctrl-C to terminate');
});