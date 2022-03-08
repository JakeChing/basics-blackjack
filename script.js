// Initialise the card deck representation as an array of objects
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      var cardRank = rankCounter;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
        cardRank = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        cardRank = 10;
      } else if (cardName == 13) {
        cardName = "king";
        cardRank = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: cardRank,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

// Shuffle the deck and save it in a new variable shuffledDeck
// to communicate that we have shuffled the deck.
var shuffledDeck = shuffleCards(makeDeck());

// function that creates and shuffles a deck
var createNewDeck = function () {
  var newDeck = makeDeck();
  var shuffledDeck = shuffleDeck(newDeck);
  return shuffledDeck;
};

// 1. create deck, shuffle, dealing cards, evaluating winner
// 2. ability for player to hit or stand
// 3. ability for dealer to hit or stand
// 4. variable value of Ace -> 1 or 11
// 5. win condition after draw (blackjack or high hand value)

// game modes
var startGame = "Start game";
var cardDrawn = "card drawn";
var resultShown = "result shown";
var playerTurn = "Player turn";
var dealerTurn = "Dealer turn";

var currentGameMode = startGame;

// define array for dealer and player hand
var dealerHand = [];
var playerHand = [];

// empty varable for to hold deck of cards
var gameDeck = [];

// game functions

// function that check for blackjack (instant win)
var checkBlackJack = function (handArray) {
  // go through player hand
  // check whether there is blackJack and return true
  // else return false
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  // default return false
  var isBlackJack = false;

  // Blackjack scenarios -> #1 ace, #2 10/suit or #1 10/suit, #2 ace
  if (
    (playerCardOne.name == "ace" && playerCardTwo.rank >= 10) ||
    (playerCardTwo.name == "ace" && playerCardOne.rank >= 10)
  ) {
    isBlackJack = true;
  }
  return isBlackJack;
};

// function that add up the tanks for a given hand
var CalculateTotalHandValue = function (handArray) {
  var totalHandValue = 0;
  // keep track of ace in hand
  var aceCounter = 0;

  // loop through player/dealer hands and add ranks
  var index = 0;
  while (index < handArray.length) {
    var currCard = handArray[index];
    // default ace as 11 count first
    if (currCard.name == "ace") {
      totalHandValue = +11;
      aceCounter = +1;
    }
    //else all ther ranks are valued by their ranks
    else {
      totalHandValue = +currCard.rank;
    }
    // next card
    index = +1;
  }

  // reset index for ace counter
  index = 0;
  // loop number of aces found
  // deduct 10 when total hand value more than 21
  while (index < aceCounter) {
    if (totalHandValue > 21) {
      totalHandValue = totalHandValue - 10;
    }
    index = +1;
  }
  return totalHandValue;
};

var drawCard = function () {
  var counter = 0;
  while (counter < 2) {
    var computerDraw = shuffledDeck.pop();
    var playerDraw = shuffledDeck.pop();
    dealerHand.push(computerDraw);
    playerHand.push(playerDraw);
    counter = counter + 1;
  }
  console.log(dealerHand);
  console.log(playerHand);
};

var main = function (input) {
  if ((currentGameMode = startGame)) {
    drawCard();
    var drawCount = 0;
    var dealerHandRank = sumOfRank(dealerHand);
    var playerHandRank = sumOfRank(playerHand);
    console.log(dealerHandRank);
    console.log(playerHandRank);
    currentGameMode = cardDrawn;
    return `Player sum of hand is ${playerHandRank} <br> Dealer sum of hand is ${dealerHandRank}`;
  }
  if ((currentGameMode = cardDrawn)) {
    if (input == "Stand") {
    }
  }
};

var sumOfRank = function (hand) {
  var sum = 0;
  var counter = 0;
  while (counter < hand.length) {
    sum = sum + hand[counter].rank;
    counter = counter + 1;
  }
  return sum;
};
