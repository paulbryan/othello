import { useState, useEffect, useCallback } from 'react';

const BOARD_SIZE = 8;
const COMPUTER_TURN_DELAY = 1000;

// Directions for checking valid moves (8 directions)
const DIRECTIONS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

export const useOthelloGame = () => {
  const [board, setBoard] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState('black');
  const [gameMode, setGameMode] = useState('pvc');
  const [playerColor, setPlayerColor] = useState('black');
  const [computerColor, setComputerColor] = useState('white');
  const [gameActive, setGameActive] = useState(true);
  const [lastComputerMove, setLastComputerMove] = useState(null);
  const [blackPlayerName, setBlackPlayerName] = useState('Black');
  const [whitePlayerName, setWhitePlayerName] = useState('White');
  const [gameOverInfo, setGameOverInfo] = useState(null);

  // Initialize the board
  const initBoard = useCallback(() => {
    const newBoard = Array(BOARD_SIZE)
      .fill(null)
      .map(() => Array(BOARD_SIZE).fill(null));

    const mid = BOARD_SIZE / 2;
    newBoard[mid - 1][mid - 1] = 'white';
    newBoard[mid - 1][mid] = 'black';
    newBoard[mid][mid - 1] = 'black';
    newBoard[mid][mid] = 'white';

    return newBoard;
  }, []);

  // Check if a move is valid
  const isValidMove = useCallback((board, row, col, player) => {
    if (board[row][col] !== null) return false;

    const opponent = player === 'black' ? 'white' : 'black';

    for (const [dx, dy] of DIRECTIONS) {
      let x = row + dx;
      let y = col + dy;
      let hasOpponent = false;

      while (x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE) {
        if (board[x][y] === null) break;
        if (board[x][y] === opponent) {
          hasOpponent = true;
        } else if (board[x][y] === player) {
          if (hasOpponent) return true;
          break;
        }
        x += dx;
        y += dy;
      }
    }

    return false;
  }, []);

  // Flip discs after a valid move
  const flipDiscs = useCallback((board, row, col, player) => {
    const newBoard = board.map(row => [...row]);
    const opponent = player === 'black' ? 'white' : 'black';

    for (const [dx, dy] of DIRECTIONS) {
      let x = row + dx;
      let y = col + dy;
      const toFlip = [];

      while (x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE) {
        if (newBoard[x][y] === null) break;
        if (newBoard[x][y] === opponent) {
          toFlip.push([x, y]);
        } else if (newBoard[x][y] === player) {
          toFlip.forEach(([fx, fy]) => {
            newBoard[fx][fy] = player;
          });
          break;
        }
        x += dx;
        y += dy;
      }
    }

    return newBoard;
  }, []);

  // Get all valid moves for a player
  const getValidMoves = useCallback((board, player) => {
    const validMoves = [];
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (isValidMove(board, row, col, player)) {
          validMoves.push([row, col]);
        }
      }
    }
    return validMoves;
  }, [isValidMove]);

  // Make a move
  const makeMove = useCallback((row, col, player) => {
    if (!isValidMove(board, row, col, player)) {
      return false;
    }

    const newBoard = [...board];
    newBoard[row][col] = player;
    const flippedBoard = flipDiscs(newBoard, row, col, player);
    setBoard(flippedBoard);

    return true;
  }, [board, isValidMove, flipDiscs]);

  // Evaluate a move by counting how many discs would be flipped
  const evaluateMove = useCallback((board, row, col, player) => {
    const opponent = player === 'black' ? 'white' : 'black';
    let flips = 0;

    for (const [dx, dy] of DIRECTIONS) {
      let x = row + dx;
      let y = col + dy;
      let tempFlips = 0;

      while (x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE) {
        if (board[x][y] === null) break;
        if (board[x][y] === opponent) {
          tempFlips++;
        } else if (board[x][y] === player) {
          flips += tempFlips;
          break;
        }
        x += dx;
        y += dy;
      }
    }

    return flips;
  }, []);

  // Check if position is next to an empty corner
  const isNextToEmptyCorner = useCallback((board, row, col) => {
    const corners = [
      {
        corner: [0, 0],
        adjacent: [
          [0, 1],
          [1, 0],
          [1, 1],
        ],
      },
      {
        corner: [0, BOARD_SIZE - 1],
        adjacent: [
          [0, BOARD_SIZE - 2],
          [1, BOARD_SIZE - 1],
          [1, BOARD_SIZE - 2],
        ],
      },
      {
        corner: [BOARD_SIZE - 1, 0],
        adjacent: [
          [BOARD_SIZE - 2, 0],
          [BOARD_SIZE - 1, 1],
          [BOARD_SIZE - 2, 1],
        ],
      },
      {
        corner: [BOARD_SIZE - 1, BOARD_SIZE - 1],
        adjacent: [
          [BOARD_SIZE - 2, BOARD_SIZE - 1],
          [BOARD_SIZE - 1, BOARD_SIZE - 2],
          [BOARD_SIZE - 2, BOARD_SIZE - 2],
        ],
      },
    ];

    for (const { corner, adjacent } of corners) {
      if (board[corner[0]][corner[1]] === null) {
        for (const [ax, ay] of adjacent) {
          if (row === ax && col === ay) {
            return true;
          }
        }
      }
    }

    return false;
  }, []);

  // Computer AI move
  const makeComputerMove = useCallback(() => {
    if (!gameActive) return;

    const validMoves = getValidMoves(board, computerColor);
    if (validMoves.length === 0) {
      return;
    }

    let bestMove = null;
    let bestScore = -Infinity;

    for (const [row, col] of validMoves) {
      let score = evaluateMove(board, row, col, computerColor);

      // Prioritize corners
      if (
        (row === 0 || row === BOARD_SIZE - 1) &&
        (col === 0 || col === BOARD_SIZE - 1)
      ) {
        score += 100;
      }
      // Prioritize edges
      else if (
        row === 0 ||
        row === BOARD_SIZE - 1 ||
        col === 0 ||
        col === BOARD_SIZE - 1
      ) {
        score += 20;
      }
      // Avoid cells next to corners if corner is empty
      else if (isNextToEmptyCorner(board, row, col)) {
        score -= 50;
      }

      if (score > bestScore) {
        bestScore = score;
        bestMove = [row, col];
      }
    }

    if (bestMove) {
      setLastComputerMove(bestMove);
      makeMove(bestMove[0], bestMove[1], computerColor);
    }
  }, [board, computerColor, gameActive, getValidMoves, evaluateMove, isNextToEmptyCorner, makeMove]);

  // Calculate scores
  const getScores = useCallback(() => {
    let blackCount = 0;
    let whiteCount = 0;

    if (!board || board.length === 0) {
      return { blackScore: 2, whiteScore: 2 };
    }

    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (board[row][col] === 'black') blackCount++;
        if (board[row][col] === 'white') whiteCount++;
      }
    }

    return { blackScore: blackCount, whiteScore: whiteCount };
  }, [board]);

  // Check if game is over
  const checkGameOver = useCallback(() => {
    const blackMoves = getValidMoves(board, 'black').length;
    const whiteMoves = getValidMoves(board, 'white').length;

    if (blackMoves === 0 && whiteMoves === 0) {
      return true;
    }

    // Check if board is full
    let emptyCells = 0;
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (board[row][col] === null) emptyCells++;
      }
    }

    return emptyCells === 0;
  }, [board, getValidMoves]);

  // Switch player
  const switchPlayer = useCallback(() => {
    const opponent = currentPlayer === 'black' ? 'white' : 'black';

    if (getValidMoves(board, opponent).length > 0) {
      setCurrentPlayer(opponent);
    } else if (getValidMoves(board, currentPlayer).length > 0) {
      // Current player plays again
    } else {
      // No valid moves for either player - game over
      const { blackScore, whiteScore } = getScores();
      let winner = null;
      let blackName = gameMode === 'pvc' && computerColor === 'black' ? 'Computer' : blackPlayerName;
      let whiteName = gameMode === 'pvc' && computerColor === 'white' ? 'Computer' : whitePlayerName;

      if (blackScore > whiteScore) {
        winner = 'black';
      } else if (whiteScore > blackScore) {
        winner = 'white';
      } else {
        winner = 'tie';
      }

      setGameActive(false);
      setGameOverInfo({
        blackScore,
        whiteScore,
        winner,
        blackName,
        whiteName,
        playerWon: gameMode === 'pvc' && winner !== 'tie' && 
                   ((winner === 'black' && computerColor !== 'black') || 
                    (winner === 'white' && computerColor !== 'white'))
      });
    }
  }, [currentPlayer, board, getValidMoves, gameMode, computerColor, blackPlayerName, whitePlayerName, getScores]);

  // Handle cell click
  const handleCellClick = useCallback((row, col) => {
    if (!gameActive) return;
    if (gameMode === 'pvc' && currentPlayer === computerColor) return;

    setLastComputerMove(null);

    if (makeMove(row, col, currentPlayer)) {
      if (!checkGameOver()) {
        switchPlayer();
      }
    }
  }, [gameActive, gameMode, currentPlayer, computerColor, makeMove, checkGameOver, switchPlayer]);

  // Initialize game
  const initGame = useCallback(() => {
    const newBoard = initBoard();
    setBoard(newBoard);
    setCurrentPlayer('black');
    setGameActive(true);
    setLastComputerMove(null);
    setGameOverInfo(null);
  }, [initBoard]);

  // Effect to make computer move
  useEffect(() => {
    if (gameMode === 'pvc' && currentPlayer === computerColor && gameActive) {
      const timer = setTimeout(() => {
        makeComputerMove();
        if (!checkGameOver()) {
          switchPlayer();
        }
      }, COMPUTER_TURN_DELAY);

      return () => clearTimeout(timer);
    }
  }, [gameMode, currentPlayer, computerColor, gameActive, makeComputerMove, checkGameOver, switchPlayer]);

  // Initialize on mount
  useEffect(() => {
    const newBoard = initBoard();
    setBoard(newBoard);
    setCurrentPlayer('black');
    setGameActive(true);
    setLastComputerMove(null);
    setGameOverInfo(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    board,
    currentPlayer,
    gameMode,
    setGameMode,
    playerColor,
    setPlayerColor,
    computerColor,
    setComputerColor,
    gameActive,
    lastComputerMove,
    blackPlayerName,
    setBlackPlayerName,
    whitePlayerName,
    setWhitePlayerName,
    gameOverInfo,
    handleCellClick,
    initGame,
    isValidMove,
    getScores,
    getValidMoves,
  };
};
