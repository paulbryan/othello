import type { Winner, Scores } from '../types'

interface GameOverProps {
  isOpen: boolean;
  winner: Winner;
  scores: Scores;
  blackName: string;
  whiteName: string;
  onPlayAgain: () => void;
}

function GameOver({ isOpen, winner, scores, blackName, whiteName, onPlayAgain }: GameOverProps) {
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
