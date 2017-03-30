/* A module representing the game of lightbikes */
// class Game{
module.exports = exports = Game;

function Game(io, sockets, room) {
    this.io = io;
    this.room = room;
    this.players = sockets.map(function(socket, i) {

      // Initialize the player
      var player = {
        socket: socket,
        id: i + 1
      }

      // Join the room
      player.socket.join(room);

      // Handle disconnect events
      player.socket.on('disconnect', function() {
        io.to(room).emit('player disconnected');
      });

      player.socket.on('deal', function() {
        io.to(room).emit('Dealing cards');
      });

      // socket.on('deal', function() {
      //   message.innerHTML = 'dealing...!';
      //   message.style.display = 'Dealing';
      // });
      
      return player;
    });
    
    var game = this;
    // Start the game

    this.io.to(this.room).emit('game on');
}

Game.prototype.update = function() {
    var room = this.room;
    var io = this.io;

    // Update players
    this.players.forEach(function(player, i, players){
      var otherPlayer = players[(i+1)%2];
    });
}
