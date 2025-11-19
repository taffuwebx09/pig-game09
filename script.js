"use strict";

// 1.Selecting Elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const diceEl = document.querySelector(".dice");

// 2.Selecting All Buttons
const newGameStart = document.querySelector("#btn--new");
const scrollBtn = document.querySelector("#btn--scroll");
const holdBtn = document.querySelector("#btn--hold");

// 3.Initial Game Setup
let scores, currentscore, activePlayer, isGamePlaye;

const initial = () => {
  scores = [0, 0];
  currentscore = 0;
  activePlayer = 0;
  isGamePlaye = true;

  diceEl.classList.add("hidden");
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
};

initial();

// 5.swith playere function
const swithPlayer = () => {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentscore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// 6.Dice Roll Event

scrollBtn.addEventListener("click", () => {
  // Game rune true to play game
  if (isGamePlaye) {
    // dice image show
    diceEl.classList.remove("hidden");

    // dice number genrate
    const dices = Math.trunc(Math.random() * 6) + 1;
    console.log(dices);

    // dice image show
    diceEl.src = `dice.svg/dice-${dices}.svg`;

    if (dices !== 1) {
      // Store dices value in currentscore
      currentscore += dices;

      // show currentscore value in current active player
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentscore;
    } else {
      //swith playere
      swithPlayer();
    }
  }
});

// 7.Score Hold Funstion

holdBtn.addEventListener("click", () => {
  // Game rune true to play game
  if (isGamePlaye) {
    scores[activePlayer] += currentscore;

    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      // Game rune fale to stop game
      isGamePlaye = false;
      diceEl.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--active");
    } else {
      swithPlayer();
    }
  }
});

// 8.New Game Start Funstion

newGameStart.addEventListener("click", initial);
