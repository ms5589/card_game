window.onload = function() {

  // Global variables
  var message = document.getElementById('message');
  var player4 = document.getElementById('player4');
  var player3 = document.getElementById('player3');
  var player2 = document.getElementById('player2');
  var player1 = document.getElementById('player1');

  var socket = io();
  var colors = [];
  var me = 1;
  colors[0] = 'green';
  colors[1] = 'red';


  socket.on('set', function(set){

    set.players.forEach(function(player){
      var id = player.id      // player's id
      var name = player.name  // player's name
      var hand = player.hand  // player's hand

      // save the current player globally
      me = id;

      if(id == 1){
          name = 'Player1';
          player1.innerHTML =  name+': '+hand;
      }
      if(id == 2){
          name = 'Player2';
          player2.innerHTML =  name+': '+hand;
      }
      if(id == 3){
          name = 'Player3';
          player3.innerHTML =  name+': '+hand;
      }
      if(id == 4){
          name = 'Player4';
          player4.innerHTML =  name+': '+hand;
      }

    })
    
  });

  // Handle game on events
  socket.on('game on', function() {
    
    message.innerHTML = 'Game started';

  });

  socket.on('card-played', function(data) {
       var card = document.createElement("a");
       card.href = "#";
       card.text = " "+data.card;
       table.appendChild(card);

       // Decrement the corresponding player's hand 
       /*if(data.playerId != me) {
         var player = document.getElementById('player' + data.player);
         player.innerHTML = player.innerHTML.slice(0, player.innerHTML.length - 1);
       }*/

       console.log('dealer() > card played', data.card);   
  });

  socket.on('hand', function(plyr) {
      
      var id = plyr.id;
      var hand = plyr.hand;
      var name = plyr.name;
      
      if(id == 1){
          name = 'Player1';
          var temp = ''+hand;
          var result1 = temp.split(",");
          for(var i=0; i<result1.length; i++){
            player1.innerHTML += "<a href='#' draggable='true' ondragstart='drag(event)'id="+(i+1)+">"+result1[i]+"</a>"+"&nbsp&nbsp";
          }          
      }
      if(id == 2){
          name = 'Player2';
          var temp = ''+hand;
          var result1 = temp.split(",");
          for(var i=0; i<result1.length; i++){
            player2.innerHTML += "<a href='#' draggable='true' ondragstart='drag(event)'id="+(i+1)+">"+result1[i]+"</a>"+"&nbsp&nbsp";
          }  
      }
      if(id == 3){
          name = 'Player3';
          player3.innerHTML =  name+': '+hand;
      }
      if(id == 4){
          name = 'Player4';
          player4.innerHTML =  name+': '+hand;
      }
      
  });

  window.onkeydown = function(event) {
    event.preventDefault();
      switch(event.keyCode) {
      // Enter
        case 13:
        alert("You pressed 'Enter'");
        socket.emit('deal');
        break;
    }
  }

  window.playCard = function(card) {
    console.log('card.txt: ', card);
    socket.emit('played-card', card);
  }
}
