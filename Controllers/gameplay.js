/* A module representing the game of lightbikes */
// class Game{
module.exports = exports = Game;
numberOfdecks = [1];
function Game(io, sockets, room) {
    this.io = io;
    this.room = room;
    
    // this.xx = this.deck[0].slice(0,3);
    // this.x = this.deck[0].slice(4,7);
    
    this.players = sockets.map(function(socket, i) {
    
    this.deck = numberOfdecks.map(function(deckCards) {
        deckCards = []
        suits = ['H','S','C','D'],
        cardValues = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']
        
        for(var num=1; num<=1; num++){
          // console.log("debug", suits);
          for(var x=0; x<suits.length; x++){
            for(var y=0; y<cardValues.length; y++){
              deckCards.push(cardValues[y]+suits[x]);
            } 
          }
        }
        
        for(var c = deckCards.length - 1; c > 0; c--) {
          var rand = Math.floor(Math.random() * (c + 1));
          var a = deckCards[c];
          deckCards[c] = deckCards[rand];
          deckCards[rand] = a;
        }
        // console.log("Debug> length(0-3):", deckCards.slice(0,3));
        // console.log("Debug> length(4-7):", deckCards.slice(4,7));
        return deckCards; 
    });

      // Draw a hand for the player
      var hand = []
      // console.log('Debug length: ',this.deck[0].length);
      hand.push(this.deck[0].pop());
      hand.push(this.deck[0].pop());
      hand.push(this.deck[0].pop());

      // Initialize the player
      var player = {
        socket: socket,
        id: i+1,
        name: '',
        hand: hand,
        table: ''
      }

      var table = {
        cards: ''
      }
      // Join the room
      player.socket.join(room);

      // Handle disconnect events
      player.socket.on('disconnect', function() {
        io.to(room).emit('player disconnected');
      });
      
      return player;

    });
    
    // this.players[0].x = 210;
    // this.players[0].y = 420;

    // After players are all set up...
    this.io.to(room).emit('set', {
      players: this.players.map(function(player){
        return {
          id: player.id,
          name: player.name,
          table: '',
          hand: player.hand.map(function(){return ''})
        }
      })
    });


    // send individual hand messages
    this.players.forEach(function(player) {
      player.socket.emit('hand', {
        id: player.id,
        name: player.name,
        hand: player.hand
      })
    });

    // Set up game events
    this.io.on('bid', function(){
      // TODO: Handle bidding
    })

    this.io.on('show', function(){
      // TODO: Handle showing hand
    })

/*
    // notify player 0 of thier info
    this.players[0].emit('set', {
      id: this.players[0].id,
      name: this.players[0].name,
      hand: this.players[0].hand
    });
    // notify player 1 of player 0 info\
    this.players[1].emit('set', {
      id: this.players[0].id,
      name: this.players[0].name,
      hand: this.players[1].hand.map(function(){return 'bb'})
    })


    this.io.to(this.room).emit('set', {
      x: this.players[0].x,
      y: this.players[0].y,
      id: this.players[0].id,
      name: 'YOU',
      hand: this.x
    });
    
    this.players[1].x = 210;
    this.players[1].y = 25;
    this.io.to(this.room).emit('set', {
      x: this.players[1].x,
      y: this.players[1].y,
      id: this.players[1].id,
      name: 'Player 1',
      hand: this.xx
    });

    /*
    this.players[2].x = 25;
    this.players[2].y = 190;
    this.io.to(this.room).emit('set', {
      x: this.players[2].x,
      y: this.players[2].y,
      id: this.players[2].id,
      name: 'PLAYER 2'
    });
    
    this.players[3].x = 400;
    this.players[3].y = 190;
    this.io.to(this.room).emit('set', {
      x: this.players[3].x,
      y: this.players[3].y,
      id: this.players[3].id,
      name: 'PLAYER 3'
    }); 
    */
    
    var game = this;
    // Start the game

    this.io.to(this.room).emit('game on');

}

/*
Game.prototype.update = function() {
    var room = this.room;
    var io = this.io;

    // Update players
    this.players.forEach(function(player, i, players){
      // var player = players[0];
      var otherPlayer = players[(i+1)%2];
      
      player.socket.emit('victory');
      
      io.to(room).emit('set', {
        x: player.x,
        y: player.y,
        id: player.id,
        hand: player.hand,
        name: player.name
      });
      
      // io.to(room).emit('set', {
      //   x: otherPlayer.x,
      //   y: otherPlayer.y,
      //   id: otherPlayer.id,
      //   hand: otherPlayer.hand,
      //   name: otherPlayer.name
      // });
    });
} */