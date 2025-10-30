// Game State
let board = []
let currentPlayer = 'black'
let gameMode = 'pvp' // 'pvp' or 'pvc'
let gameActive = true
let lastComputerMove = null // Track the last move made by computer
const BOARD_SIZE = 8
const WHITE_TURN_DELAY = 1000 // 1 second delay for computer move
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
]

// Initialize the game
function initGame() {
  board = Array(BOARD_SIZE)
    .fill(null)
    .map(() => Array(BOARD_SIZE).fill(null))

  // Set initial pieces
  const mid = BOARD_SIZE / 2
  board[mid - 1][mid - 1] = 'white'
  board[mid - 1][mid] = 'black'
  board[mid][mid - 1] = 'black'
  board[mid][mid] = 'white'

  currentPlayer = 'black'
  gameActive = true
  lastComputerMove = null // Clear last move highlight on new game

  renderBoard()
  updateScore()
  updateCurrentPlayer()
}

// Render the board
function renderBoard() {
  const boardElement = document.getElementById('board')
  boardElement.innerHTML = ''

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const cell = document.createElement('div')
      cell.className = 'cell'
      cell.dataset.row = row
      cell.dataset.col = col

      if (board[row][col]) {
        const disc = document.createElement('div')
        disc.className = `disc ${board[row][col]}`
        cell.appendChild(disc)
      }

      // Highlight the last computer move
      if (
        lastComputerMove &&
        lastComputerMove[0] === row &&
        lastComputerMove[1] === col
      ) {
        cell.classList.add('last-move')
      }

      // Show valid moves for current player
      if (gameActive && isValidMove(row, col, currentPlayer)) {
        cell.classList.add('valid-move')
      }

      cell.addEventListener('click', () => handleCellClick(row, col))
      boardElement.appendChild(cell)
    }
  }
}

// Handle cell click
function handleCellClick(row, col) {
  if (!gameActive) return
  if (gameMode === 'pvc' && currentPlayer === 'white') return // Computer's turn

  // Clear the last computer move highlight when player makes a move
  lastComputerMove = null

  if (makeMove(row, col, currentPlayer)) {
    renderBoard()
    updateScore()

    if (!checkGameOver()) {
      switchPlayer()

      // If playing against computer and it's computer's turn
      if (gameMode === 'pvc' && currentPlayer === 'white') {
        setTimeout(makeComputerMove, WHITE_TURN_DELAY)
      }
    }
  }
}

// Make a move
function makeMove(row, col, player) {
  if (!isValidMove(row, col, player)) {
    return false
  }

  board[row][col] = player
  flipDiscs(row, col, player)

  return true
}

// Check if a move is valid
function isValidMove(row, col, player) {
  if (board[row][col] !== null) return false

  const opponent = player === 'black' ? 'white' : 'black'

  for (const [dx, dy] of DIRECTIONS) {
    let x = row + dx
    let y = col + dy
    let hasOpponent = false

    while (x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE) {
      if (board[x][y] === null) break
      if (board[x][y] === opponent) {
        hasOpponent = true
      } else if (board[x][y] === player) {
        if (hasOpponent) return true
        break
      }
      x += dx
      y += dy
    }
  }

  return false
}

// Flip discs after a valid move
function flipDiscs(row, col, player) {
  const opponent = player === 'black' ? 'white' : 'black'

  for (const [dx, dy] of DIRECTIONS) {
    let x = row + dx
    let y = col + dy
    const toFlip = []

    while (x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE) {
      if (board[x][y] === null) break
      if (board[x][y] === opponent) {
        toFlip.push([x, y])
      } else if (board[x][y] === player) {
        toFlip.forEach(([fx, fy]) => {
          board[fx][fy] = player
        })
        break
      }
      x += dx
      y += dy
    }
  }
}

// Get all valid moves for a player
function getValidMoves(player) {
  const validMoves = []
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (isValidMove(row, col, player)) {
        validMoves.push([row, col])
      }
    }
  }
  return validMoves
}

// Switch player
function switchPlayer() {
  const opponent = currentPlayer === 'black' ? 'white' : 'black'

  // Check if opponent has valid moves
  if (getValidMoves(opponent).length > 0) {
    currentPlayer = opponent
    updateCurrentPlayer()
    renderBoard()
  } else if (getValidMoves(currentPlayer).length > 0) {
    // Current player plays again
    updateCurrentPlayer()
    renderBoard()
  } else {
    // No valid moves for either player - game over
    endGame()
  }
}

// Computer AI move (simple strategy)
function makeComputerMove() {
  if (!gameActive) return

  const validMoves = getValidMoves('white')
  if (validMoves.length === 0) {
    switchPlayer()
    return
  }

  // Strategy: prefer corners, edges, then maximize flips
  let bestMove = null
  let bestScore = -1

  for (const [row, col] of validMoves) {
    let score = evaluateMove(row, col)

    // Prioritize corners
    if (
      (row === 0 || row === BOARD_SIZE - 1) &&
      (col === 0 || col === BOARD_SIZE - 1)
    ) {
      score += 100
    }
    // Prioritize edges
    else if (
      row === 0 ||
      row === BOARD_SIZE - 1 ||
      col === 0 ||
      col === BOARD_SIZE - 1
    ) {
      score += 20
    }
    // Avoid cells next to corners if corner is empty
    else if (isNextToEmptyCorner(row, col)) {
      score -= 50
    }

    if (score > bestScore) {
      bestScore = score
      bestMove = [row, col]
    }
  }

  if (bestMove) {
    // Store the computer's move position to highlight it
    lastComputerMove = bestMove

    makeMove(bestMove[0], bestMove[1], 'white')
    renderBoard()
    updateScore()

    if (!checkGameOver()) {
      switchPlayer()
    }
  }
}

// Evaluate a move by counting how many discs would be flipped
function evaluateMove(row, col) {
  const player = 'white'
  const opponent = 'black'
  let flips = 0

  for (const [dx, dy] of DIRECTIONS) {
    let x = row + dx
    let y = col + dy
    let tempFlips = 0

    while (x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE) {
      if (board[x][y] === null) break
      if (board[x][y] === opponent) {
        tempFlips++
      } else if (board[x][y] === player) {
        flips += tempFlips
        break
      }
      x += dx
      y += dy
    }
  }

  return flips
}

// Check if position is next to an empty corner
function isNextToEmptyCorner(row, col) {
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
  ]

  for (const { corner, adjacent } of corners) {
    if (board[corner[0]][corner[1]] === null) {
      for (const [ax, ay] of adjacent) {
        if (row === ax && col === ay) {
          return true
        }
      }
    }
  }

  return false
}

// Update score display
function updateScore() {
  let blackCount = 0
  let whiteCount = 0

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col] === 'black') blackCount++
      if (board[row][col] === 'white') whiteCount++
    }
  }

  document.getElementById('blackScore').textContent = blackCount
  document.getElementById('whiteScore').textContent = whiteCount
}

// Update current player display
function updateCurrentPlayer() {
  const playerName =
    currentPlayer === 'black'
      ? 'Black'
      : gameMode === 'pvc'
      ? 'Computer (White)'
      : 'White'
  document.getElementById('currentPlayer').textContent = `${playerName}'s Turn`
}

// Check if game is over
function checkGameOver() {
  const blackMoves = getValidMoves('black').length
  const whiteMoves = getValidMoves('white').length

  if (blackMoves === 0 && whiteMoves === 0) {
    endGame()
    return true
  }

  // Check if board is full
  let emptyCells = 0
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col] === null) emptyCells++
    }
  }

  if (emptyCells === 0) {
    endGame()
    return true
  }

  return false
}

// End the game
function endGame() {
  gameActive = false

  const blackScore = parseInt(document.getElementById('blackScore').textContent)
  const whiteScore = parseInt(document.getElementById('whiteScore').textContent)

  let message
  if (blackScore > whiteScore) {
    message = `Black wins! ${blackScore} - ${whiteScore}`
  } else if (whiteScore > blackScore) {
    const whiteName = gameMode === 'pvc' ? 'Computer' : 'White'
    message = `${whiteName} wins! ${whiteScore} - ${blackScore}`
  } else {
    message = `It's a tie! ${blackScore} - ${whiteScore}`
  }

  document.getElementById('gameOverTitle').textContent = 'Game Over!'
  document.getElementById('gameOverMessage').textContent = message
  document.getElementById('gameOver').classList.remove('hidden')
}

// Theme toggle
function toggleTheme() {
  document.body.classList.toggle('dark-mode')
  localStorage.setItem(
    'theme',
    document.body.classList.contains('dark-mode') ? 'dark' : 'light'
  )
}

// Load saved theme
function loadTheme() {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode')
  }
}

// Apply custom colors
function applyColors() {
  const boardColor = document.getElementById('boardColor').value
  const blackPieceColor = document.getElementById('blackPieceColor').value
  const whitePieceColor = document.getElementById('whitePieceColor').value

  document.documentElement.style.setProperty('--board-color', boardColor)
  document.documentElement.style.setProperty('--black-piece', blackPieceColor)
  document.documentElement.style.setProperty('--white-piece', whitePieceColor)

  // Save to localStorage
  localStorage.setItem('boardColor', boardColor)
  localStorage.setItem('blackPieceColor', blackPieceColor)
  localStorage.setItem('whitePieceColor', whitePieceColor)

  renderBoard()
}

// Load saved colors
function loadColors() {
  const savedBoardColor = localStorage.getItem('boardColor')
  const savedBlackColor = localStorage.getItem('blackPieceColor')
  const savedWhiteColor = localStorage.getItem('whitePieceColor')

  if (savedBoardColor) {
    document.documentElement.style.setProperty('--board-color', savedBoardColor)
    document.getElementById('boardColor').value = savedBoardColor
  }
  if (savedBlackColor) {
    document.documentElement.style.setProperty('--black-piece', savedBlackColor)
    document.getElementById('blackPieceColor').value = savedBlackColor
  }
  if (savedWhiteColor) {
    document.documentElement.style.setProperty('--white-piece', savedWhiteColor)
    document.getElementById('whitePieceColor').value = savedWhiteColor
  }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  loadTheme()
  loadColors()
  initGame()

  document.getElementById('newGame').addEventListener('click', () => {
    gameMode = document.querySelector('input[name="gameMode"]:checked').value
    initGame()
    document.getElementById('gameOver').classList.add('hidden')
  })

  document.getElementById('playAgain').addEventListener('click', () => {
    gameMode = document.querySelector('input[name="gameMode"]:checked').value
    initGame()
    document.getElementById('gameOver').classList.add('hidden')
  })

  document.getElementById('themeToggle').addEventListener('click', toggleTheme)

  document.getElementById('colorSettings').addEventListener('click', () => {
    document.getElementById('colorModal').classList.remove('hidden')
  })

  document.getElementById('applyColors').addEventListener('click', () => {
    applyColors()
    document.getElementById('colorModal').classList.add('hidden')
  })

  document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('colorModal').classList.add('hidden')
  })

  document.querySelectorAll('input[name="gameMode"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      gameMode = radio.value
    })
  })
})
