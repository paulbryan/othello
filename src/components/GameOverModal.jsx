import './Modal.css';

const GameOverModal = ({ gameOverInfo, onPlayAgain }) => {
  if (!gameOverInfo) return null;

  const { blackScore, whiteScore, winner, blackName, whiteName } = gameOverInfo;

  let message;
  if (winner === 'black') {
    message = `${blackName} wins! ${blackScore} - ${whiteScore}`;
  } else if (winner === 'white') {
    message = `${whiteName} wins! ${whiteScore} - ${blackScore}`;
  } else {
    message = `It's a tie! ${blackScore} - ${whiteScore}`;
  }

  return (
    <div className="game-over">
      <div className="game-over-content">
        <h2>Game Over!</h2>
        <p>{message}</p>
        <button onClick={onPlayAgain} className="btn btn-primary">Play Again</button>
      </div>
    </div>
  );
};

export default GameOverModal;
