// Easy AI - Random number generator, keep rolling until it finds an open slot
class TicTacToe {
  constructor() {
    this.playerAmount = '';
    this.playerOne = '';
    this.playerTwo = '';
    this.currentTurn = 'x';
    this.turnControl = false;
    this.computerTurnControl = false;
    this.computerDifficulty = '';
    this.winner = '';
    this.board = [];
    this.playerOneScore = 0;
    this.playerTwoScore = 0;
    this.roundCount = 0;
    this.winner = '';
    this.computerPlayer = '';
    this.gameButtons = document.getElementsByClassName('game-button');

    for (let i = 0; i < this.gameButtons.length; i += 1) {
      this.gameButtons[i].addEventListener('click', (event) => {
        this.addMarker(event);
      });
    }
  }

  clearBoard() {
    for (let i = 0; i < this.gameButtons.length; i += 1) {
      this.gameButtons[i].innerText = '';
    }

    this.winner = '';
  }

  gameStart() {
    this.playerOneScore = 0;
    this.playerTwoScore = 0;
    this.roundCount = 1;

    if (this.playerAmount === 'one' && this.playerOne === 'o') {
      this.computerTurnControl = true;
      this.computerTurn();
    } else {
      this.clearBoard();
      this.playerTurn();
    }
  }

  playerTurn() {
    for (let i = 0; i < this.gameButtons.length; i += 1) {
      this.gameButtons[i].disabled = false;
    }

    this.computerTurnControl = false;
    this.turnControl = true;
  }

  addMarker(event) {
    const target = event.currentTarget || event;
    const marker = this.currentTurn;

    if (this.turnControl === true && !target.innerText) {
      target.innerText = marker;
      this.turnControl = false;
      this.updateBoard();
    } else if (this.computerTurnControl === true) {
      target.innerText = marker;
      this.turnControl = false;
      this.updateBoard();
    }
  }

  switchTurn() {
    if (this.currentTurn === 'x') {
      this.currentTurn = 'o';
    } else {
      this.currentTurn = 'x';
    }

    const displayTurn = document.getElementById('game-display-turn');
    if (this.playerAmount === 'two') {
      if (this.currentTurn === 'x') {
        if (this.playerOne === 'x') {
          displayTurn.innerText = 'Player One\'s Turn';
        } else {
          displayTurn.innerText = 'Player Two\'s Turn';
        }
      } else if (this.currentTurn === 'o') {
        if (this.playerOne === 'o') {
          displayTurn.innerText = 'Player One\'s Turn';
        } else {
          displayTurn.innerText = 'Player Two\'s Turn';
        }
      }
    } else if (this.playerAmount === 'one') {
      if (this.playerOne === 'x') {
        if (this.currentTurn === 'x') {
          displayTurn.innerText = 'Your Turn';
        } else {
          displayTurn.innerText = 'Computer\'s Turn';
        }
      } else if (this.playerOne === 'o') {
        if (this.currentTurn === 'x') {
          displayTurn.innerText = 'Computer\'s Turn';
        } else {
          displayTurn.innerText = 'Your Turn';
        }
      }

      if (this.computerTurnControl === true) {
        this.playerTurn();
      }
    }

    displayTurn.classList.remove('slide-in');
    displayTurn.classList.add('hidden');

    setTimeout(() => {
      displayTurn.classList.add('slide-in');
      displayTurn.classList.remove('hidden');
    }, 25);

    if (this.playerAmount === 'one' && this.currentTurn === this.computerPlayer) {
      this.computerTurnControl = true;
      this.computerTurn();
    } else {
      this.playerTurn();
    }
  }

  updateBoard() {
    this.board = [];
    for (let i = 0; i < this.gameButtons.length; i += 1) {
      this.board[i] = this.gameButtons[i].innerText;
    }
    this.checkForVictory(this.currentTurn);
  }

  checkForVictory(player) {
    const splitBoard = [[], [], []];
    const board = this.board.map(value => value);

    for (let i = 0; i < board.length; i += 1) {
      if (board[i] === player) {
        board[i] = 1;
      } else {
        board[i] = 0;
      }
    }

    splitBoard[0] = board.slice(0, 3);
    splitBoard[1] = board.slice(3, 6);
    splitBoard[2] = board.slice(6, 9);

    const column = [0, 0, 0];
    let diagOne = 0;
    let diagTwo = 0;
    let row = 0;

    for (let r = 0; r < splitBoard[0].length; r += 1) {
      row = 0;
      for (let c = 0; c < splitBoard[0].length; c += 1) {
        row += splitBoard[r][c];
        column[c] += splitBoard[r][c];

        if (r === 0 && c === 0) {
          diagOne += splitBoard[r][c];
        } else if (r === 2 && c === 0) {
          diagTwo += splitBoard[r][c];
        } else if (r === 0 && c === 2) {
          diagTwo += splitBoard[r][c];
        } else if (r === 2 && c === 2) {
          diagOne += splitBoard[r][c];
        } else if (r === 1 && c === 1) {
          diagOne += splitBoard[r][c];
          diagTwo += splitBoard[r][c];
        }

        if (row === 3 || column[c] === 3 || diagOne === 3 || diagTwo === 3) {
          this.winner = player;
        }
      }
    }

    if (this.winner === '') {
      this.checkForTies();
    } else {
      this.displayWinner();
      // this.newRound();
    }
  }

  checkForTies() {
    const boardString = this.board.join('');

    if (boardString.length === 9) {
      this.displayTie();
    } else {
      this.switchTurn();
    }
  }

  displayWinner() {
    const winner = document.createElement('div');

    if (this.playerAmount === 'one') {
      if (this.playerOne === 'x') {
        if (this.winner === 'x') {
          winner.innerText = 'You Win!';
        } else {
          winner.innerText = 'Computer Wins!';
        }
      } else if (this.playerOne === 'o') {
        if (this.winner === 'o') {
          winner.innerText = 'You Win!';
        } else {
          winner.innerText = 'Computer Wins!';
        }
      }
    } else if (this.playerAmount === 'two') {
      if (this.playerOne === 'x') {
        if (this.winner === 'x') {
          winner.innerText = 'Player One Wins!';
        } else {
          winner.innerText = 'Player Two Wins!';
        }
      } else if (this.playerOne === 'o') {
        if (this.winner === 'o') {
          winner.innerText = 'Player One Wins!';
        } else {
          winner.innerText = 'Player Two Wins!';
        }
      }
    }

    winner.id = 'winner-text';
    winner.style.position = 'absolute';
    winner.style.width = '100%';
    winner.style.top = '47%';
    winner.style.textAlign = 'center';
    winner.style.zIndex = '10';
    winner.style.fontSize = '3em';

    winner.classList.add('slide-prep');
    winner.classList.add('hidden');

    document.getElementById('game-board').appendChild(winner);

    setTimeout(() => {
      for (let i = 0; i < this.gameButtons.length; i += 1) {
        this.gameButtons[i].style.color = '#ccc';
      }
      document.getElementById('game-display-turn').innerText = '';
      winner.classList.add('slide-in');
      winner.classList.remove('hidden');
    }, 5);

    setTimeout(() => {
      winner.classList.add('slide-out');
    }, 1500);

    setTimeout(() => {
      document.getElementById('winner-text').remove();
    }, 1800);

    setTimeout(() => {
      for (let i = 0; i < this.gameButtons.length; i += 1) {
        this.gameButtons[i].style.color = 'black';
      }
      this.newRound();
    }, 2000);
  }

  displayTie() {
    const tie = document.createElement('div');

    tie.innerText = 'Tie!';
    tie.id = 'tie-text';
    tie.style.position = 'absolute';
    tie.style.width = '100%';
    tie.style.top = '47%';
    tie.style.textAlign = 'center';
    tie.style.zIndex = '10';
    tie.style.fontSize = '4em';

    tie.classList.add('slide-prep');
    tie.classList.add('hidden');

    document.getElementById('game-board').appendChild(tie);

    setTimeout(() => {
      for (let i = 0; i < this.gameButtons.length; i += 1) {
        this.gameButtons[i].style.color = '#ccc';
      }
      document.getElementById('game-display-turn').innerText = '';
      tie.classList.add('slide-in');
      tie.classList.remove('hidden');
    }, 5);

    setTimeout(() => {
      tie.classList.add('slide-out');
    }, 1500);

    setTimeout(() => {
      document.getElementById('tie-text').remove();
    }, 1800);

    setTimeout(() => {
      for (let i = 0; i < this.gameButtons.length; i += 1) {
        this.gameButtons[i].style.color = 'black';
      }
      this.newRound();
    }, 2000);
  }

  newRound() {
    this.updateScores();
    this.clearBoard();

    // take turns on who goes first
    this.roundCount += 1;
    if (this.roundCount % 2 === 0) {
      this.currentTurn = 'x';
    } else {
      this.currentTurn = 'o';
    }

    this.switchTurn();
  }

  updateScores() {
    if (this.winner !== '') {
      if (this.playerAmount === 'two') {
        if (this.winner === 'x') {
          if (this.playerOne === 'x') {
            this.playerOneScore += 1;
          } else {
            this.playerTwoScore += 1;
          }
        } else if (this.winner === 'o') {
          if (this.playerOne === 'o') {
            this.playerOneScore += 1;
          } else {
            this.playerTwoScore += 1;
          }
        }
      } else if (this.playerAmount === 'one') {
        if (this.winner === 'x') {
          this.playerOneScore += 1;
        } else {
          this.playerTwoScore += 1;
        }
      }

      document.getElementById('player-one-score').innerText = this.playerOneScore;
      document.getElementById('player-two-score').innerText = this.playerTwoScore;
    }
  }

  /* *************
      COMPUTER AI
     ************* */
  easyAI() {
    const generateRandomNumber = function () {
      return Math.floor(Math.random() * (9)) + 0;
    };

    let makeMove = true;

    while (makeMove) {
      const tryPositon = generateRandomNumber();

      if (this.gameButtons[tryPositon].innerText === '') {
        makeMove = false;
        this.addMarker(this.gameButtons[tryPositon]);
      }
    }
  }

  computerTurn() {
    for (let i = 0; i < this.gameButtons.length; i += 1) {
      this.gameButtons[i].disabled = true;
    }

    setTimeout(() => {
      this.easyAI();
    }, 1000);
  }
}

const ticTacToe = new TicTacToe();

/* ****************************************
    OPENING SCREEN HANDLING & RESET BUTTON
   **************************************** */
/* handles which game options are on the screen */
const options = {
  openingScreen: document.getElementById('opening-screen'),
  gameScreen: document.getElementById('game-screen'),
  playerAmount: document.getElementsByClassName('player-amount'),
  xOrO: document.getElementsByClassName('play-as'),
  q2c: document.getElementsByClassName('question-two-container'),
  q3c: document.getElementsByClassName('question-three-container'),
  q2: document.getElementById('opening-question-two'),
};

const revealNextQueston = function (numPlayers) {
  if (numPlayers === 'one') {
    options.q2.innerText = 'Play as:';
  } else {
    options.q2.innerText = 'Player 1 will be?';
  }

  setTimeout(() => {
    options.q2c[0].classList.remove('hidden');
    options.q2c[0].classList.add('slide-in');
  }, 250);
};

/* handles the player amount option */
const setPlayerAmount = function (event) {
  ticTacToe.playerAmount = event.currentTarget.value;

  options.q3c[0].classList.add('hidden');
  options.q3c[0].classList.remove('slide-in');

  options.playerAmount[0].classList.remove('active');
  options.playerAmount[1].classList.remove('active');

  event.currentTarget.classList.add('active');

  options.xOrO[0].classList.remove('active');
  options.xOrO[1].classList.remove('active');

  options.q2c[0].classList.remove('slide-in');
  options.q2c[0].classList.add('hidden');
  options.q2c[0].classList.add('slide-prep');

  revealNextQueston(event.currentTarget.value);
};

for (let i = 0; i < options.playerAmount.length; i += 1) {
  options.playerAmount[i].addEventListener('click', event => setPlayerAmount(event));
}

/* handles who goes first option */
const setWhoGoesFirst = function (event) {
  if (event.currentTarget.value === 'x') {
    ticTacToe.playerOne = 'x';
    ticTacToe.playerTwo = 'o';
    ticTacToe.computerPlayer = 'o';
  } else {
    ticTacToe.playerOne = 'o';
    ticTacToe.playerTwo = 'x';
    ticTacToe.computerPlayer = 'x';
  }

  options.xOrO[0].classList.remove('active');
  options.xOrO[1].classList.remove('active');

  event.currentTarget.classList.add('active');

  options.q3c[0].classList.add('slide-prep');
  options.q3c[0].classList.remove('hidden');
  options.q3c[0].classList.add('slide-in');
};

for (let i = 0; i < options.xOrO.length; i += 1) {
  options.xOrO[i].addEventListener('click', event => setWhoGoesFirst(event));
}

/* start game button */
const playerOne = document.getElementById('player-one');
const playerTwo = document.getElementById('player-two');
const playerTurn = document.getElementById('game-display-turn');
const gameButtons = document.getElementsByClassName('game-button');

document.getElementById('start-game').addEventListener('click', () => {
  playerTurn.classList.remove('slide-in');
  playerTurn.classList.add('hidden');
  playerTurn.classList.add('slide-prep');
  ticTacToe.clearBoard();
  setTimeout(() => {
    playerTurn.classList.add('slide-in');
    playerTurn.classList.remove('hidden');
    ticTacToe.currentTurn = 'x';
    for (let i = 0; i < gameButtons.length; i += 1) {
      gameButtons[i].disabled = false;
    }
    ticTacToe.gameStart();
  }, 600);

  if (ticTacToe.playerAmount === 'one' && ticTacToe.playerOne === 'x') {
    playerOne.innerText = 'Player One';
    playerTwo.innerText = 'Computer';
    playerTurn.innerText = 'Your Turn';
  } else if (ticTacToe.playerAmount === 'one' && ticTacToe.playerOne === 'o') {
    playerOne.innerText = 'Computer';
    playerTwo.innerText = 'Player One';
    playerTurn.innerText = 'Computer\'s Turn';
  } else if (ticTacToe.playerAmount === 'two' && ticTacToe.playerOne === 'x') {
    playerOne.innerText = 'Player One';
    playerTwo.innerText = 'Player Two';
    playerTurn.innerText = 'Player One\'s Turn';
  } else {
    playerTurn.innerText = 'Player Two\'s Turn';
  }
  options.openingScreen.classList.add('remove');

  options.gameScreen.classList.remove('slide-in');
  options.gameScreen.classList.add('slide-prep');
  options.gameScreen.classList.add('slide-in');
  options.gameScreen.classList.remove('remove');
});

/* reset game button */
document.getElementById('reset-button').addEventListener('click', () => {
  document.getElementById('player-one-score').innerText = 0;
  document.getElementById('player-two-score').innerText = 0;

  for (let i = 0; i < gameButtons.length; i += 1) {
    gameButtons[i].disabled = true;
  }

  options.playerAmount[0].classList.remove('active');
  options.playerAmount[1].classList.remove('active');

  options.q2c[0].classList.add('hidden');
  options.q3c[0].classList.add('hidden');

  options.openingScreen.classList.remove('slide-in');
  options.openingScreen.classList.add('slide-prep');
  options.openingScreen.classList.add('slide-in');

  options.gameScreen.classList.add('remove');
  options.openingScreen.classList.remove('remove');
});
