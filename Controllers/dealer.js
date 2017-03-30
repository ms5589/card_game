window.onload = function() {

  // Global variables
  var canvas = document.getElementById('screen');
  var message = document.getElementById('message');
  var ctx = canvas.getContext('2d');
  var socket = io();
  
  // Handle game on events
  socket.on('game on', function() {
    message.innerHTML = 'started?';
    var btn = window.document.createElement("BUTTON");
    var t = document.createTextNode("Deal");
    btn.appendChild(t);
    document.body.appendChild(btn);
    btn.onclick = function(){
      socket.emit('deal');
    }
    //message.style.display = 'none';
  });
}

window.onkeydown = function(event) {
  event.preventDefault();
    switch(event.keyCode) {
    // Enter
      case 13:
      socket.emit('deal');
      break;
  }
}