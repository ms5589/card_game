const PORT = 4001;
// ask how to handle get/post requests in this code
const fs = require('fs');

var html = fs.readFileSync('Views/lobby/game_room.html', {encoding: 'utf8'});
var js = fs.readFileSync('Controllers/dealer.js', {encoding: 'utf8'});
var login_ejs = fs.readFileSync('Views/login/login.ejs', {encoding: 'utf8'});

// var sessions = require('client-sessions');
// var app = express(); 
var players = [];
var games = 0;
const Game = require('./Controllers/gameplay');

function handleRequest(request, response) {
  switch(request.url) {
    case '/game':
    
    case '/game_room.html':
      response.setHeader('Content-Type', 'text/html');
      response.end(html);
      break;

    case '/dealer.js':
      response.setHeader('Content-Type', 'text/js');
      response.end(js);
      break;
    // if(request.method == "GET"){
      // if (request.url == "/login"){
    case '/login':
      response.setHeader('Content-Type', 'text/html');
      response.end(login_ejs);
      break;
    }

  }

var server = require('http').createServer(handleRequest);

var io = require('socket.io')(server);

/* Handles a player connection */
io.on('connection', function(socket){
  console.log('a user connected');
  players.push(socket);

  // If we have two players, Launch a game instance
  if(players.length == 2) {
    new Game(io, players, games);
    players = [];
    games++;
  }
});

// var server = require('http').createServer(handleRequest);

/* Launch the server */
server.listen(PORT, function(){
  console.log("Server listening on: http://localhost:%s", PORT);
});
