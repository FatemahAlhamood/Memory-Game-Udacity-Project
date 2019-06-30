//Create a list that holds all of your cards

const iconsList = ["fa fa-diamond", "fa fa-anchor",
							 "fa fa-paper-plane-o", "fa fa-diamond", "fa fa-paper-plane-o",
							 "fa fa-anchor", "fa fa-cube",
							 "fa fa-bolt", "fa fa-bolt",
							  "fa fa-cube", "fa fa-bicycle",
							 "fa fa-leaf", "fa fa-leaf",
							 "fa fa-bicycle", "fa fa-bomb",
							  "fa fa-bomb"];

const allCards = document.querySelector(".deck");
let openedCards = [];
let matchedCards = [];

/*
	Shuffle function from http://stackoverflow.com/a/2450976 to shuffle the game
	Inputs: array of symbols
	Output: shuffled cards
*/
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
//Start the game
function initGame() {
		let arrShuffled = shuffle(iconsList);
    for(let i = 0; i < arrShuffled.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${arrShuffled[i]}"></i>`;
        allCards.appendChild(card);
        click(card);
    }
}

let firstClick = true;
function click(card) {
    card.addEventListener("click", function() {

        if(firstClick) {
// Start the timer
            startTimer();
            firstClick = false;
        }

        const firstCard = this;
        const secondCard = openedCards[0];

					if(openedCards.length === 1 && !card.classList.contains("open")){
							console.log("YESSSS");
							card.classList.add("open", "show", "disable");
            	openedCards.push(this);

//comparing both opened cards
            compare(firstCard, secondCard);

        } else {
// if there is no opened cards
					if(!firstCard.classList.contains("open")){
          firstCard.classList.add("open", "show", "disable");
				  openedCards.push(card);
				}

				}
    });
	}


function compare(firstCard, secondCard) {

// Matche
    if(firstCard.innerHTML === secondCard.innerHTML) {

        firstCard.classList.add("match");
        secondCard.classList.add("match");
        matchedCards.push(firstCard, secondCard);

        openedCards = [];

				//If the user won!
        youWon();

    } else {

// Waitting for 500ms then, do this
        setTimeout(function() {
            firstCard.classList.remove("open", "show", "disable");
            secondCard.classList.remove("open", "show", "disable");

        }, 500);

        openedCards = [];

    }

    addMove();
}

//Check if the user win
 function youWon() {
    if(matchedCards.length === iconsList.length) {
// Stop the timer
        stopTimer();
        setTimeout(function() {
					alert("Congrats, You won!!");
					alert("Do you want to play agin?");
				}, 520);


	  }
}


// Add move
const movesCounter = document.querySelector(".moves");
let moves = 0;
movesCounter.innerHTML = 0;
function addMove() {
    moves++;
    movesCounter.innerHTML = moves;

    rating();
}

// Star Rating
const starsContainer = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;
starsContainer.innerHTML = star + star + star;
function rating() {

    if( moves < 15) {
        starsContainer.innerHTML = star + star + star;
    } else if( moves < 20) {
        starsContainer.innerHTML = star + star;
    } else {
        starsContainer.innerHTML = star;
    }
}


//Timer

const timeCounter = document.querySelector(".timer");
let currentTime,
    totalSeconds = 0;
timeCounter.innerHTML = totalSeconds + 's';


//This function will start when the user click on the first card
 function startTimer() {
    currentTime = setInterval(function() {

        totalSeconds++;
        timeCounter.innerHTML = totalSeconds + 's';

    }, 1000);
}

// The timer will stop with clearInterval!

function stopTimer() {
    clearInterval(currentTime);
}

//Restart Button

const restartButton = document.querySelector(".restart");
restartButton.addEventListener("click", function() {
// Delete all cards
    allCards.innerHTML = "";

// Call initGame to create new cards
    initGame();

// Reset the game
    reset();

});

//Reset all game variables
function reset() {
    matchedCards = [];
    moves = 0;
    movesCounter.innerHTML = moves;
    starsContainer.innerHTML = star + star + star;

    stopTimer();
    firstClick = true;
    totalSeconds = 0;
    timeCounter.innerHTML = totalSeconds + "s";
}

//Restart the game!
initGame();
