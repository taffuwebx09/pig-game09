'use strict';

// player element sellect

const playerName = document.querySelector('#active-player-name');
const scorePlayer1 = document.querySelector('#player-0-score');
const scorePlayer2 = document.querySelector('#player-1-score');
const currentScorePlayer1 = document.querySelector('#player-0-current');
const currentScorePlayer2 = document.querySelector('#player-1-current');
const diceSVG = document.querySelector('.dice');

const activePlayer1 = document.querySelector('.left-container');
const activePlayer2 = document.querySelector('.right-container');
const activePlayerName1 = document.querySelector('.player-name1');
const activePlayerNmae2 = document.querySelector('.player-name2');

// game button sellect

const newGameBtn = document.querySelector('.new-game-btn');
const rollGameBtn = document.querySelector('.roll-dice-btn');
const holdGameBtn = document.querySelector('.hold-dice-btn');

/*------ Game Start ------*/

scorePlayer1.textContent = '0';
scorePlayer2.textContent = '0';
currentScorePlayer1.textContent = '0';
currentScorePlayer2.textContent = '0';
diceSVG.classList.add('dice-hideen');

// game functions

let currentScore = 0;
let activePlayer = 0;
let score = [0, 0];
let isGamePlaye = true;

const playerChange = () => {
  document.querySelector(`#player-${activePlayer}-current`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  activePlayer1.classList.toggle('active-player');
  activePlayer2.classList.toggle('active-player');

  activePlayerName1.classList.toggle('active-player-name');
  activePlayerNmae2.classList.toggle('active-player-name');
};

const restartGame = () => {
  currentScore = 0;
  activePlayer = 0;
  score = [0, 0];
  isGamePlaye = true;

  scorePlayer1.textContent = '0';
  scorePlayer2.textContent = '0';
  currentScorePlayer1.textContent = '0';
  currentScorePlayer2.textContent = '0';
  diceSVG.classList.add('dice-hideen');

  activePlayer1.classList.add('active-player');
  activePlayer2.classList.remove('active-player');

  activePlayer1.classList.remove('winner-player');
  activePlayer2.classList.remove('winner-player');
  confetti.stop();
};

rollGameBtn.addEventListener('click', () => {
  if (isGamePlaye) {
    const dice = Math.floor(Math.random() * 6) + 1;

    diceSVG.classList.remove('dice-hideen');

    diceSVG.src = `images/dice-${dice}.svg`;

    if (dice !== 1) {
      currentScore += dice;

      document.querySelector(`#player-${activePlayer}-current`).textContent =
        currentScore;
    } else if (dice === 1) {
      playerChange();
    }
  }
});

holdGameBtn.addEventListener('click', () => {
  if (isGamePlaye) {
    score[activePlayer] += currentScore;

    document.querySelector(`#player-${activePlayer}-score`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 100) {
      isGamePlaye = false;

      diceSVG.classList.add('dice-hideen');

      let winnerPlayer = document.querySelector(`.player--${activePlayer}`);

      winnerPlayer.classList.add('winner-player');

      confetti.start();
    } else {
      playerChange();
    }
  }
});

newGameBtn.addEventListener('click', () => {
  restartGame();
});
