import React from 'react'

function GameOver({ isOpen, winner, scores, blackName, whiteName, onPlayAgain }) {
  if (!isOpen) return null

  let message
  if (winner === 'black') {
    message = `${blackName} wins! ${scores.black} - ${scores.white}`
  } else if (winner === 'white') {
    message = `${whiteName} wins! ${scores.white} - ${scores.black}`
  } else {
    message = `It's a tie! ${scores.black} - ${scores.white}`
  }

  return (
    <div className="game-over">
      <div className="game-over-content">
        <h2>Game Over</h2>
        <p>{message}</p>
        <button onClick={onPlayAgain} className="btn btn-primary">Play Again</button>
      </div>
    </div>
  )
}

export default GameOver
