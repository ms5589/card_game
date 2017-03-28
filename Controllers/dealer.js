window.onload = function() {

  // Global variables
  var canvas = document.getElementById('screen');
  var message = document.getElementById('message');
  var ctx = canvas.getContext('2d');
  var socket = io();
  
  // Handle game on events
  socket.on('game on', function() {
    message.innerHTML = 'started?';
    message.style.display = 'none';
  });

  socket.on('deal', function() {
    message.innerHTML = 'dealing...!';
    message.style.display = 'Dealing';
  });
}