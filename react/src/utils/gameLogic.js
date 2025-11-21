import { BOARD_SIZE, DIRECTIONS } from './constants'

export function createInitialBoard() {
  const board = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null))
  const mid = BOARD_SIZE / 2
  board[mid - 1][mid - 1] = 'white'
  board[mid - 1][mid] = 'black'
  board[mid][mid - 1] = 'black'
  board[mid][mid] = 'white'
  return board
}

export function isValidMove(board, row, col, player) {
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

export function getValidMoves(board, player) {
  const validMoves = []
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (isValidMove(board, row, col, player)) {
        validMoves.push([row, col])
      }
    }
  }
  return validMoves
}

export function calculateFlips(board, row, col, player) {
  const opponent = player === 'black' ? 'white' : 'black'
  const flips = []

  for (const [dx, dy] of DIRECTIONS) {
    let x = row + dx
    let y = col + dy
    const potentialFlips = []

    while (x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE) {
      if (board[x][y] === null) break
      if (board[x][y] === opponent) {
        potentialFlips.push([x, y])
      } else if (board[x][y] === player) {
        flips.push(...potentialFlips)
        break
      }
      x += dx
      y += dy
    }
  }
  return flips
}

export function evaluateMove(board, row, col, player) {
  const opponent = player === 'black' ? 'white' : 'black'
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

  // Strategy: prefer corners, edges
  let score = flips

  // Corners
  if ((row === 0 || row === BOARD_SIZE - 1) && (col === 0 || col === BOARD_SIZE - 1)) {
    score += 100
  }
  // Edges
  else if (row === 0 || row === BOARD_SIZE - 1 || col === 0 || col === BOARD_SIZE - 1) {
    score += 20
  }
  
  return score
}

export function getScores(board) {
  let black = 0
  let white = 0
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col] === 'black') black++
      if (board[row][col] === 'white') white++
    }
  }
  return { black, white }
}
