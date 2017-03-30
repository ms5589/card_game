const PORT = 4001;
// ask how to handle get/post requests in this code
// THIS FILE IS AN ATTEMPT TO BUILD THE APPLICATION WITHout THE EXPRESS (NOT IN USE FOR NOW)
// IGNORE THIS FILE
const fs = require('fs');
var router = require('./router'),
    homepage = require('./Controllers/homepage'),
    game = require('./Controllers/game');

var html = fs.readFileSync('Views/lobby/game_room.html', {encoding: 'utf8'});
var js = fs.readFileSync('Controllers/dealer.js', {encoding: 'utf8'});
var login_ejs = fs.readFileSync('Views/login/login.ejs', {encoding: 'utf8'});
var error = fs.readFileSync('Views/error.html', {encoding: 'utf8'});

var sessions = require('client-sessions');
// var app = express(); 
var players = [];
var games = 0;
const Game = require('./Controllers/gameplay');
var http = require('http');

function handleRequest(request, response) {
  if(request.method == "GET"){
    switch(request.url) {
      case '/game':
      // case '/game_room.html':
        response.setHeader('Content-Type', 'text/html');
        response.end(html);
        // game.startGame(request, response);
        break;

      case '/dealer.js':
        response.setHeader('Content-Type', 'text/js');
        response.end(js);
        break;
      
      // if (request.url == "/login"){
      case '/login':
        response.setHeader('Content-Type', 'text/html');
        response.end(login_ejs);
        break;

      case '/logout':
        homepage.logout(request, response);
        break;
       
      default:
        response.end(error);
      }
  }
  // else if (request.method == "POST"){

  // }
}
var server = require('http').createServer(handleRequest);
// var server = http.Server(router.route).listen(PORT);


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
// console.log("Hosting at PORT:",PORT);
/* Launch the server */
server.listen(PORT, function(){
  console.log("Server listening on: http://localhost:%s", PORT);
});
