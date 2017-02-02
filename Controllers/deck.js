"use strict"
var cards = require('./cards');

class Deck{

	constructor() {
		this.cards = new Array(cards);
	}

	// Shuffles the deck
  	shuffleDeck(req, res){
  		console.log("Controller > Deck > shuffleDeck()");

  		var deckCards = [];
		
		//Getting the deck ready here
		//Will run this process/loop twice since we need two deck to play this game
		for(var num=1; num<=2; num++){
			for(var x=0; x<cards.Suits.length; x++){
				for(var y=0; y<cards.CardValues.length; y++){
					deckCards.push(cards.CardValues[y]+cards.Suits[x]);
				}	
			}
		}

		console.log("Number of cards on deck, ",deckCards.length);
		
		// Process of shuffling cards below
  		for(var c = deckCards.length - 1; c > 0; c--) {
		    	var rand = Math.floor(Math.random() * (c + 1));
		    	var a = deckCards[c];
		    	deckCards[c] = deckCards[rand];
		    	deckCards[rand] = a;
	  	}
	  	
	  	res.render('temp/temp',{deckCards:deckCards});
	}
}

module.exports = exports = new Deck();
