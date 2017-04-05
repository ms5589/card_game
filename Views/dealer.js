window.onload = function() {

  // Global variables
  var canvas = document.getElementById('screen');
  var message = document.getElementById('message');
  var ctx = canvas.getContext('2d');
  var socket = io();
  var colors = [];
  colors[0] = 'green';
  colors[1] = '#e2fc3c';
  ctx.fillStyle = 'gray';
  ctx.fillRect(0, 0, 1000, 1000);

  socket.on('set', function(player){
    ctx.fillStyle = colors[player.id];
    ctx.font = "20px Georgia";
    var name = ''+player.name;
    var hand = ''+player.hand;
    console.log('Name',hand);
    console.log("PLAYER ID= ", ctx.fillStyle);
    ctx.fillRect(player.x, player.y, 60, 60);
    ctx.fillText(hand, player.x, player.y);
  });

  // Handle game on events
  socket.on('game on', function() {
    message.innerHTML = 'started?';
    var btn = window.document.createElement("BUTTON");
    var t = document.createTextNode("Deal");
    btn.appendChild(t);
    document.body.appendChild(btn);
    btn.onclick = function(){
      alert('Clicked');
    }
    //message.style.display = 'none';
  });

  socket.on('victory', function() {
    message.innerHTML = 'You win!';
    // message.style.display = 'block';
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