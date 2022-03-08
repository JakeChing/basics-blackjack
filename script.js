// 1. create deck, shuffle, dealing cards, evaluating winner
// 2. ability for player to hit or stand
// 3. ability for dealer to hit or stand
// 4. variable value of Ace -> 1 or 11
// 5. win condition after draw (blackjack or high hand value)

// game modes
var startGame = "Start game";
var cardDrawn = "card drawn";
// var resultShown = "result shown";
var hitOrStand = "hit or stand";

var currentGameMode = startGame;

// define array for dealer and player hand
var dealerHand = [];
var playerHand = [];

// empty varable for to hold deck of cards
var gameDeck = [];

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

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
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
  var shuffledDeck = shuffleCards(newDeck);
  return shuffledDeck;
};

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

// function that add up the tanks for a given hand (any players)
var CalculateTotalHandValue = function (handArray) {
  var totalHandValue = 0;
  // keep track of ace in hand
  var aceCounter = 0;

  // loop through player/dealer hands and add ranks
  var index = 0;
  while (index < handArray.length) {
    var currCard = handArray[index];

    // Value of king, queen, and jack are counted as 10 by default
    if (
      currCard.name == "king" ||
      currCard.name == "queen" ||
      currCard.name == "jack"
    ) {
      totalHandValue = totalHandValue + 10;
    }

    // default ace as 11 count first
    else if (currCard.name == "ace") {
      totalHandValue = totalHandValue + 11;
      aceCounter = aceCounter + 1;
    }
    //else all ther ranks are valued by their ranks
    else {
      totalHandValue = totalHandValue + currCard.rank;
    }
    // next card
    index = index + 1;
  }

  // reset index for ace counter
  index = 0;
  // loop number of aces found
  // deduct 10 when total hand value more than 21
  while (index < aceCounter) {
    if (totalHandValue > 21) {
      totalHandValue = totalHandValue - 10;
    }
    index = index + 1;
  }
  return totalHandValue;
};

// to display player and dealer hands in message
var displayBothHands = function (playerHandArray, dealerHandArray) {
  // playerhand display
  var playerMessage = `Player hand: <br>`;
  var index = 0;
  while (index < playerHandArray.length) {
    playerMessage = `${playerMessage} -> ${playerHandArray[index].name} of ${playerHandArray[index].suit} <br>`;
    index = index + 1;
  }

  // dealerhand display
  var dealerMessage = `Dealer hand: <br>`;
  var index = 0;
  while (index < dealerHandArray.length) {
    dealerMessage = `${dealerMessage} -> ${dealerHandArray[index].name} of ${dealerHandArray[index].suit} <br>`;
    index = index + 1;
  }
  return playerMessage + "<br>" + dealerMessage;
};

// to display the total hand value from both hands
var displayHandTotalValues = function (playerHandValue, dealerHandValue) {
  var totalHandValueMesage = `<br> Player total hand value is ${playerHandValue} <br> Dealer total hand value is ${dealerHandValue}`;
  return totalHandValueMesage;
};

var resetGame = function () {
  dealerHand = [];
  playerHand = [];
  currentGameMode = startGame;
};

// // first initial 2 card draws
// var drawCard = function () {
//   var counter = 0;
//   while (counter < 2) {
//     var dealerDraw = shuffledDeck.pop();
//     var playerDraw = shuffledDeck.pop();
//     dealerHand.push(dealerDraw);
//     playerHand.push(playerDraw);
//     counter = counter + 1;
//   }
//   // check player and dealer card
//   console.log("Dealer Hand: " + dealerHand);
//   console.log("Player Hand: " + playerHand);
// };

var main = function (input) {
  var outputMessage = "";
  console.log("Player Hand ==>" + playerHand);
  console.log("Dealer Hand ==>" + dealerHand);
  // first click of the button
  if (currentGameMode == startGame) {
    // create a new deck of cards
    gameDeck = createNewDeck();
    console.log(gameDeck);

    // initial 2 card draw
    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());

    // check player and dealer cards
    console.log("Player Hand ==>" + playerHand);
    console.log("Dealer Hand ==>" + dealerHand);

    // update game mode
    currentGameMode = cardDrawn;
    outputMessage =
      "Cards has been drawn. Please click button to calculate cards value!";
    console.log(currentGameMode);
    return outputMessage;
  }

  // second click (calculate value)
  if (currentGameMode == cardDrawn) {
    // first check for blackack function  (true or false)
    var playerHasBlackjack = checkBlackJack(playerHand);
    var dealerHasBlackjack = checkBlackJack(dealerHand);

    // check if dealer or player has blackjack
    console.log("Does Player have Black Jack? ==>" + playerHasBlackjack);
    console.log("Does Dealer have Black Jack? ==>" + dealerHasBlackjack);

    // if either players has blackjack
    // need this condition to narrow down to when there is blackjack
    if (playerHasBlackjack == true || dealerHasBlackjack == true) {
      // when both has blackjack
      if (playerHasBlackjack == true && dealerHasBlackjack == true) {
        outputMessage = `${displayBothHands(
          playerHand,
          dealerHand
        )} <br> It's a Black Jack Tie!`;
      }
      // when player black jack
      else if (playerHasBlackjack == true && dealerHasBlackjack == false) {
        outputMessage = `${displayBothHands(
          playerHand,
          dealerHand
        )} <br> Player wins by Black Jack!`;
      }
      // when dealer has black jack
      else {
        outputMessage = `${displayBothHands(
          playerHand,
          dealerHand
        )} <br> Dealer wins by Black Jack!`;
      }
      resetGame();
      console.log(currentGameMode);
      console.log("Player Hand ==>" + playerHand);
      console.log("Dealer Hand ==>" + dealerHand);
    }
    // when both players does not have blackjack
    // game continue
    // player to decide to hit or stand
    else {
      outputMessage = `${displayBothHands(
        playerHand,
        dealerHand
      )} <br> No one has Black Jacks. <br> Player please input "hit" or "stand" to continue.`;

      // update game mode
      currentGameMode = hitOrStand;
    }
    // return message
    return outputMessage;
  }

  // After player choose hit or stand
  if (currentGameMode == hitOrStand) {
    // when player inputs "hit"
    if (input == "hit") {
      playerHand.push(gameDeck.pop());
      outputMessage = `${displayBothHands(
        playerHand,
        dealerHand
      )} <br> Player drew another card. <br> Player please input "hit" or "stand" to continue.`;
    }
    // when player input "stand"
    else if (input == "stand") {
      // calculate hand and see if the game can end
      var playerHandTotalValue = CalculateTotalHandValue(playerHand);
      var dealerHandTotalValue = CalculateTotalHandValue(dealerHand);

      // Dealer hit or stand logic
      while (dealerHandTotalValue < 17) {
        dealerHand.push(gameDeck.pop());
        dealerHandTotalValue = CalculateTotalHandValue(dealerHand);
      }

      // condition for tied game
      if (
        playerHandTotalValue == dealerHandTotalValue ||
        (playerHandTotalValue > 21 && dealerHandTotalValue > 21)
      ) {
        outputMessage = `${displayBothHands(
          playerHand,
          dealerHand
        )} <br> Its a Tie!" ${displayHandTotalValues(
          playerHandTotalValue,
          dealerHandTotalValue
        )}`;
      }

      // condition for player win
      else if (
        (playerHandTotalValue > dealerHandTotalValue &&
          playerHandTotalValue <= 21) ||
        (playerHandTotalValue <= 21 && dealerHandTotalValue > 21)
      ) {
        outputMessage = `${displayBothHands(
          playerHand,
          dealerHand
        )} <br> Player wins!" ${displayHandTotalValues(
          playerHandTotalValue,
          dealerHandTotalValue
        )}`;
      }

      // Dearler win (last possible condition)
      else {
        outputMessage = `${displayBothHands(
          playerHand,
          dealerHand
        )} <br> Dealer wins!" ${displayHandTotalValues(
          playerHandTotalValue,
          dealerHandTotalValue
        )}`;
      }

      // update game mode back to the start
      resetGame();
    }

    // input validation for "hit" or "stand"
    else {
      outputMessage = `Please only input "hit" or "stand" to continue. <br><br> ${displayBothHands(
        playerHand,
        dealerHand
      )}`;
    }

    // return output message
    return outputMessage;
  }
};
