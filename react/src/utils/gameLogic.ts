import { BOARD_SIZE, DIRECTIONS } from './constants'
import type { Board, Player, Position, Scores } from '../types'

export function createInitialBoard(): Board {
  const board = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null))
  const mid = BOARD_SIZE / 2
  board[mid - 1][mid - 1] = 'white'
  board[mid - 1][mid] = 'black'
  board[mid][mid - 1] = 'black'
  board[mid][mid] = 'white'
  return board
}

export function isValidMove(board: Board, row: number, col: number, player: Player): boolean {
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

export function getValidMoves(board: Board, player: Player): Position[] {
  const validMoves: Position[] = []
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (isValidMove(board, row, col, player)) {
        validMoves.push([row, col])
      }
    }
  }
  return validMoves
}

export function calculateFlips(board: Board, row: number, col: number, player: Player): Position[] {
  const opponent = player === 'black' ? 'white' : 'black'
  const flips: Position[] = []

  for (const [dx, dy] of DIRECTIONS) {
    let x = row + dx
    let y = col + dy
    const potentialFlips: Position[] = []

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

export function evaluateMove(board: Board, row: number, col: number, player: Player): number {
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

export function getScores(board: Board): Scores {
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
