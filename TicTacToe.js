const prompt = require('prompt');

// Initialize board
let board = {
  1: ' ',
  2: ' ',
  3: ' ',
  4: ' ',
  5: ' ',
  6: ' ',
  7: ' ',
  8: ' ',
  9: ' '
};

// Make a move
const makeMove = (loc, move) => {
  board[loc] = move.toUpperCase();
}

// Log board function
const logBoard = () => {
  console.log('\n' +
    ' ' + board[1] + ' | ' + board[2] + ' | ' + board[3] + '\n' +
    ' ---------\n' +
    ' ' + board[4] + ' | ' + board[5] + ' | ' + board[6] + '\n' +
    ' ---------\n' +
    ' ' + board[7] + ' | ' + board[8] + ' | ' + board[9] + '\n');
}

// Validate each move
const isInteger = (value) => {
  var x;
  if (isNaN(value)) {
    return false;
  }
  x = parseFloat(value);
  return (x | 0) === x;
}

const verifyMove = (loc) => {
  return (isInteger(loc) && board[loc] === ' ')
}

// Win combinations constant
const winCombinations = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7],
[2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

// Check for winner
const checkWin = (player) => {
  var i, j, markCount
  for (i = 0; i < winCombinations.length; i++) {
    markCount = 0;
    for (j = 0; j < winCombinations[i].length; j++) {
      if (board[winCombinations[i][j]] === player) {
        markCount++;
      }
      if (markCount === 3) {
        return true;
      }
    }
  }
  return false;
}

// Check for tie
const checkTie = () => {
  for (var i = 1; i <= Object.keys(board).length; i++) {
    if (board[i] === ' ') {
      return false;
    }
  }
  return true;
}

// Play game function
const playGame = (player) => {

  console.log('Your turn player: ' + player);
  prompt.start();
  prompt.get(['loc'], (err, result) => {

    if (verifyMove(result.loc)) {
      makeMove(result.loc, player);
      logBoard();
      if (checkWin(player)) {
        console.log(`Player ${player} is the winner!`);
        return;
      }
      if (checkTie()) {
        console.log('It\'s a tie!');
        return;
      }
      if (player === 'X') {
        playGame('O');
      } else {
        playGame('X');
      }
    } else {
      console.log('Invalid input please make a valid move.');
      playGame(player);
    }
  });
}

// First prompt to define coordinates
console.log('Are you ready to play Tic-Tac-Toe? \n' +
  ' 1 | 2 | 3 \n' +
  ' --------- \n' +
  ' 4 | 5 | 6 \n' +
  ' --------- \n' +
  ' 7 | 8 | 9 \n');

// Start game
playGame('X');
