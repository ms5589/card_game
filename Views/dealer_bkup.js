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
  var me = 1;
  var score1; var score2;

  // Set the players with card when the game beginss
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

  // This event will occur when a player plays the card
  socket.on('card-played', function(data) {
       console.log('DATAA: ',data);
       var for_result = {card:data.card, player:data.player};       
       score1 = 0;
       score2 = 0;
       var card = document.createElement("a");
       card.href = "#";
       card.text = " "+data.card;
       table.appendChild(card);
       temp.push(data.card);
       flag.push(for_result);
       console.log('flag ',flag,' and length ',flag.length);
              
       //Decrement the corresponding player's hand 
       if(data.playerId != me) {
         var player = document.getElementById('player' + data.player);
         player.innerHTML = player.innerHTML.slice(0, player.innerHTML.length - 1);
       }
       console.log('dealer() > card played', data.card);   
       
       if(temp.length >=2)
        {
          // console.log()
          setTimeout(function(){ message.innerHTML=message.innerHTML; }, 3000);
          console.log('flag', flag.length);
          var wohoo = setTimeout(findWinner(), 5000);
          // console.log('out of timeout flag', flag.length);
          flag=[];
       }
  });

  // Display and create hand for each player
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


  // helped function to a function written in Controllers > gameplay.js
  window.playCard = function(card) {
    console.log('card.txt: ', card);
    socket.emit('played-card', card);
  }

  // this function will find the winner of particular hand
  function findWinner(){
    table.innerHTML='';
    var winner = highercard(temp[0], temp[1]);
    console.log('debug winner, ',winner,' flag_len ',flag.length,' temp_len ',temp.length);
    if(winner=="same"){
      setTimeout(alert("Tie"),2000);
    }
    if(winner == temp[0]){
      alert(''+temp[0]+ ' > ' + temp[1]);
      console.log(winner,' & 0',temp[0]);
      for(var m =0; m<temp.length; m++){
        if(flag[m].card==temp[0]){
          console.log('dubug0, ',flag[m].player);
          if(flag[m].player==1){
            score1.innerHTML = 'Score: ',score1+10;
          }
          if(flag[m].player==2){
            score2.innerHTML = 'Score: ',score2+10;
          }
          setTimeout(alert('Player'+flag[m].player+' won this hand'),2000);
        }
      }
    }
    if(winner == temp[1]){
      alert(''+temp[1]+ ' > ' + temp[0]);
      console.log(winner,' & 1',temp[1]);
      for(var m =0; m<temp.length; m++){
        if(flag[m].card==temp[1]){
          console.log('debug1, ',flag[m].player);
          if(flag[m].player==1){
            score1.innerHTML = 'Score: ',score1+10;
          }
          if(flag[m].player==2){
            score2.innerHTML = 'Score: ',score2+10;
          }
          setTimeout(alert('Player'+flag[m].player+' won this hand'),2000);
        }
      }
    }
    temp=[];
  }

  function highercard(card1, card2){
    
    // an array to give each card value their rank based on their index
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

    // if both played cards are spaded
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
    
    // if only one (first) card is a spade card
    if(spade_val_1 && !(spade_val_2)){
      console.log('In condition 2');
      return card1;
    } 
    
    // if only one (second) card is a spade card
    // if(spade_val_1 && !(spade_val_2)){
    if(spade_val_2 && !(spade_val_1)) {
      console.log('In condition 3');
      return card2;
    }
    
    // if none of the card is a spade card
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