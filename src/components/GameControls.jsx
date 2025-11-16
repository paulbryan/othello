import './GameControls.css';

const GameControls = ({
  gameMode,
  playerColor,
  onGameModeChange,
  onPlayerColorChange,
  onNewGame,
  blackPlayerName,
  whitePlayerName,
  onBlackPlayerNameChange,
  onWhitePlayerNameChange,
}) => {
  return (
    <div className="game-controls">
      <button onClick={onNewGame} className="btn btn-primary">New Game</button>
      <div className="mode-selection">
        <label>
          <input
            type="radio"
            name="gameMode"
            value="pvp"
            checked={gameMode === 'pvp'}
            onChange={(e) => onGameModeChange(e.target.value)}
          />
          Player vs Player
        </label>
        <label>
          <input
            type="radio"
            name="gameMode"
            value="pvc"
            checked={gameMode === 'pvc'}
            onChange={(e) => onGameModeChange(e.target.value)}
          />
          Player vs Computer
        </label>
      </div>
      {gameMode === 'pvc' ? (
        <div className="color-selection">
          <label>Play as:</label>
          <label>
            <input
              type="radio"
              name="playerColor"
              value="black"
              checked={playerColor === 'black'}
              onChange={(e) => onPlayerColorChange(e.target.value)}
            />
            Black
          </label>
          <label>
            <input
              type="radio"
              name="playerColor"
              value="white"
              checked={playerColor === 'white'}
              onChange={(e) => onPlayerColorChange(e.target.value)}
            />
            White
          </label>
        </div>
      ) : (
        <div className="player-names">
          <div className="name-input-group">
            <label htmlFor="blackPlayerName">Black Player:</label>
            <input
              type="text"
              id="blackPlayerName"
              placeholder="Black"
              maxLength="20"
              value={blackPlayerName}
              onChange={(e) => onBlackPlayerNameChange(e.target.value)}
            />
          </div>
          <div className="name-input-group">
            <label htmlFor="whitePlayerName">White Player:</label>
            <input
              type="text"
              id="whitePlayerName"
              placeholder="White"
              maxLength="20"
              value={whitePlayerName}
              onChange={(e) => onWhitePlayerNameChange(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GameControls;
