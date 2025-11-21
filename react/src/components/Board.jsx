import React from 'react'
import Cell from './Cell'
import { BOARD_SIZE } from '../utils/constants'

function Board({ board, validMoves, lastComputerMove, onCellClick }) {
  const renderBoard = () => {
    const cells = []
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        const isValid = validMoves.some(move => move[0] === row && move[1] === col)
        const isLastMove = lastComputerMove && lastComputerMove[0] === row && lastComputerMove[1] === col
        
        cells.push(
          <Cell
            key={`${row}-${col}`}
            row={row}
            col={col}
            value={board[row][col]}
            isValidMove={isValid}
            isLastMove={isLastMove}
            onClick={onCellClick}
          />
        )
      }
    }
    return cells
  }

  return (
    <div id="board" className="board">
      {renderBoard()}
    </div>
  )
}

export default Board
