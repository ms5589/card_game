window.onload = function() {

  // Global variables
  var message = document.getElementById('message');
  var player4 = document.getElementById('player4');
  var player3 = document.getElementById('player3');
  var player2 = document.getElementById('player2');
  var player1 = document.getElementById('player1');
  var temp = [];
  var flag = []; //to keep track of which player played which card for during single hand

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
       console.log('DATAA: ',data);
       var for_result = {card:data.card, player:data.player};       
       
       var card = document.createElement("a");
       card.href = "#";
       card.text = " "+data.card;
       table.appendChild(card);
       temp.push(data.card);
       flag.push(for_result);
       console.log('flag ',flag,' and length ',flag.length);
       
       // Decrement the corresponding player's hand 
       // if(data.playerId != me) {
       //   var player = document.getElementById('player' + data.player);
       //   player.innerHTML = player.innerHTML.slice(0, player.innerHTML.length - 1);
       // }
       // console.log('dealer() > card played', data.card);   
       
       if(temp.length >=2)
        {
          // console.log()
          console.log('flag', flag.length);
          setTimeout(findWinner(), 2000);
          // console.log('out of timeout flag', flag.length);
          flag=[];
       }
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

  window.playCard = function(card) {
    console.log('card.txt: ', card);
    socket.emit('played-card', card);
  }

  function findWinner(){
    table.innerHTML='';
    var winner = highercard(temp[0], temp[1]);
    console.log('debug winner, ',winner,' flag_len ',flag.length,' temp_len ',temp.length);
    if(winner=="same"){
      setTimeout(alert("Tie"),2000);
    }
    if(winner == temp[0]){
      console.log(winner,' & 0',temp[0]);
      for(var m =0; m<temp.length; m++){
        if(flag[m].card==temp[0]){
          console.log('dubug0, ',flag[m].player);
          setTimeout(alert('winner player'+flag[m].player),2000);
        }
      }
    }
    if(winner == temp[1]){
      console.log(winner,' & 1',temp[1]);
      for(var m =0; m<temp.length; m++){
        if(flag[m].card==temp[1]){
          console.log('debug1, ',flag[m].player);
          setTimeout(alert('winner player'+flag[m].player),2000);
        }
      }
    }
    temp=[];
  }

  function highercard(card1, card2){
    
    var card_vals = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
    
    if(card1.includes("S")) var spade_val_1 = card1.split("S");
    if(card2.includes("S")) var spade_val_2 = card2.split("S");

    if(card1.includes("C")) var not_spade_1 = card1.split("C");
    if(card2.includes("C")) var not_spade_2 = card2.split("C");

    if(card1.includes("H")) var not_spade_1 = card1.split("H");
    if(card2.includes("H")) var not_spade_2 = card2.split("H");

    if(card1.includes("D")) var not_spade_1 = card1.split("D");
    if(card2.includes("D")) var not_spade_2 = card2.split("D");

    var rank_1 = -1;
    var rank_2 = -1;

    if(spade_val_1 && spade_val_2){
      console.log('In condition 1', spade_val_1,' and', spade_val_2);
      for(var i=0; i<card_vals.length; i++){
        if(card_vals[i]==spade_val_1[0]){
          rank_1 = card_vals.indexOf(spade_val_1[0]);
          console.log('rank_1,',rank_1);
        }
        if(card_vals[i]==spade_val_2[0]){
          rank_2 = card_vals.indexOf(spade_val_2[0]);
          console.log('rank_2,',rank_2);
        }
      }
      if(rank_1>rank_2){
        return card1;
      }
      else {
        return card2;
      }
    }
    
    if(spade_val_1 && !(spade_val_2)){
      console.log('In condition 2');
      return card1;
    } 
    
    if(spade_val_2 && !(spade_val_1)){
      console.log('In condition 3');
      return card2;
    }
    
    if(not_spade_1 && not_spade_2){
      console.log('In condition 4');
      console.log('1 ',not_spade_1,'2 ',not_spade_2);
      for(var i=0; i<card_vals.length; i++){
        if(card_vals[i]==not_spade_1[0]){
          rank_1 = card_vals.indexOf(not_spade_1[0]);
          console.log('rank_1,', rank_1);
          
        }
        if(card_vals[i]==not_spade_2[0]){
          rank_2 = card_vals.indexOf(not_spade_2[0]);
          console.log('rank_2,', rank_2);
        }
      }
        if(rank_1 > rank_2) {
          console.log('Rank1 higher', card1);
          return card1;
        }
        else if(rank_2 > rank_1){
          console.log('Rank2 higher');
          return card2;
        }
        else return 'same';
    }
  }
}
