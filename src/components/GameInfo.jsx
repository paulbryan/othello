import './GameInfo.css';

const GameInfo = ({ blackScore, whiteScore, currentPlayer, gameMode, computerColor, blackPlayerName, whitePlayerName }) => {
  let playerName;
  if (gameMode === 'pvc') {
    if (currentPlayer === computerColor) {
      playerName = `Computer (${computerColor === 'black' ? 'Black' : 'White'})`;
    } else {
      playerName = currentPlayer === 'black' ? blackPlayerName : whitePlayerName;
    }
  } else {
    playerName = currentPlayer === 'black' ? blackPlayerName : whitePlayerName;
  }

  return (
    <div className="game-info">
      <div className="score-section">
        <div className="player-score">
          <div className="score-label">
            <span className="piece black-piece"></span>
            <span>Black</span>
          </div>
          <div className="score">{blackScore}</div>
        </div>
        <div className="player-score">
          <div className="score-label">
            <span className="piece white-piece"></span>
            <span>White</span>
          </div>
          <div className="score">{whiteScore}</div>
        </div>
      </div>
      <div className="current-player">{playerName}'s Turn</div>
    </div>
  );
};

export default GameInfo;
