window.onload = function() {

  // Global variables
  // var canvas = document.getElementById('screen');
  var message = document.getElementById('message');
  var player4 = document.getElementById('player4');
  var player3 = document.getElementById('player3');
  var player2 = document.getElementById('player2');
  var player1 = document.getElementById('player1');
  // var ctx = canvas.getContext('2d');
  // ctx.fillStyle = 'gray';
  // ctx.fillRect(0, 0, 1000, 1000);
  var socket = io();
  var colors = [];
  colors[0] = 'green';
  colors[1] = 'red';


  socket.on('set', function(set){

    set.players.forEach(function(player){
      var id = player.id // player's id
      var name = player.name // player's name
      var hand = player.hand // player's hand
      
      console.log("Player ID: ", id);
      console.log('Name: ',name);

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
    
    // var id = set.id;
    // var name = ''+set.name;
    // var hand = ''+set.hand;
    // you.innerHTML = name+': '+hand;

    
    // ctx.fillStyle = colors[id];
    // ctx.fillStyle = '#e2fc3c';
    // ctx.font = "20px Arial";
    // ctx.fillRect(set.x, set.y, 60, 60);
    // ctx.fillText(id+" "+name+" "+hand, set.x, set.y);
  });

  // Handle game on events
  socket.on('game on', function() {
    message.innerHTML = 'Game started';
    var btn = window.document.createElement("BUTTON");
    var t = document.createTextNode("Deal");
    btn.appendChild(t);
    // document.body.appendChild(btn);
    btn.onclick = function(){
      alert('Clicked');
    }
    //message.style.display = 'none';
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
    //message.style.display = 'block';
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
}