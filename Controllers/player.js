"use strict"
var deck = require('./deck');
class Player{

	constructor() {
    	var hand = ['2H','3S','1C','5D'];
    	// this.CardValues = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
  	}
  	getHand(req, res){
  		console.log('Controllers > Player > getHand()', deck.shuffledeck);
  		return deck;
  	}

}

module.exports = exports = new Player();