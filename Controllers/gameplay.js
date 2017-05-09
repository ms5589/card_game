/* A module representing the game of lightbikes */
// class Game{
module.exports = exports = Game;

numberOfdecks = [1];

function Game(io, sockets, room) {
    
    this.io = io;
    this.room = room;
    playedCards = [];
    
    // Create and shuffle the deck
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
        
        return deckCards; 
    });

    this.players = sockets.map((socket, i) => {

      // Draw a hand for the player
      var hand = []
      
      // console.log('Debug length: ',i);
      hand.push(this.deck[0].pop());
      hand.push(this.deck[0].pop());
      hand.push(this.deck[0].pop());

      // Initialize the player
      var player = {
        socket: socket,
        id: i+1,
        name: '',
        hand: hand,
        score:0,
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

      // Handle card played events 
      player.socket.on('played-card', function(cardName){

        console.log('played-card', cardName, 'player ', player.id);
        
        // TODO: player can only play cards in thier hand 
                
        // if(player.hand.includes(cardName)){
          io.emit('card-played', {player: player.id, card: cardName});
          playedCards.push(cardName);
          // console.log('The Card: ', cardName, " was played by ",player.id);
          console.log('The Card: ', playedCards, " was played by ",player.id);
        // }
      });
      
      return player;

    });

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
    
    // Start the game
    var game = this;

    this.io.to(this.room).emit('game on');
    // this.io.to(this.room).emit('card-played');
}