import { useState, useEffect } from 'react';
import { useOthelloGame } from './hooks/useOthelloGame';
import { useGameHistory, useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import GameInfo from './components/GameInfo';
import Board from './components/Board';
import GameControls from './components/GameControls';
import GameOverModal from './components/GameOverModal';
import ColorModal from './components/ColorModal';
import LeaderboardModal from './components/LeaderboardModal';
import Confetti from './components/Confetti';
import './App.css';

function App() {
  const game = useOthelloGame();
  const { saveGameResult } = useGameHistory();
  const { getValue: getTheme, setValue: setTheme } = useLocalStorage('theme', 'light');
  const { getValue: getPlayerColor, setValue: setPlayerColorStorage } = useLocalStorage('playerColor', 'black');
  const { getValue: getBlackName, setValue: setBlackNameStorage } = useLocalStorage('blackPlayerName', 'Black');
  const { getValue: getWhiteName, setValue: setWhiteNameStorage } = useLocalStorage('whitePlayerName', 'White');

  const [showColorModal, setShowColorModal] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Load theme on mount
  useEffect(() => {
    const savedTheme = getTheme();
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
    }
  }, [getTheme]);

  // Load saved colors on mount
  useEffect(() => {
    const savedBoardColor = localStorage.getItem('boardColor');
    const savedBlackColor = localStorage.getItem('blackPieceColor');
    const savedWhiteColor = localStorage.getItem('whitePieceColor');

    if (savedBoardColor) {
      document.documentElement.style.setProperty('--board-color', savedBoardColor);
    }
    if (savedBlackColor) {
      document.documentElement.style.setProperty('--black-piece', savedBlackColor);
    }
    if (savedWhiteColor) {
      document.documentElement.style.setProperty('--white-piece', savedWhiteColor);
    }
  }, []);

  // Load saved player preferences
  useEffect(() => {
    const savedPlayerColor = getPlayerColor();
    if (savedPlayerColor) {
      game.setPlayerColor(savedPlayerColor);
      game.setComputerColor(savedPlayerColor === 'black' ? 'white' : 'black');
    }

    const savedBlackName = getBlackName();
    if (savedBlackName) {
      game.setBlackPlayerName(savedBlackName);
    }

    const savedWhiteName = getWhiteName();
    if (savedWhiteName) {
      game.setWhitePlayerName(savedWhiteName);
    }
  }, [getPlayerColor, getBlackName, getWhiteName, game]);

  // Save game result when game is over
  useEffect(() => {
    if (game.gameOverInfo) {
      const { blackName, whiteName, blackScore, whiteScore, winner, playerWon } = game.gameOverInfo;
      saveGameResult(blackName, whiteName, blackScore, whiteScore, winner, game.gameMode);

      if (playerWon) {
        // Use a flag or ref to prevent cascading renders
        const timer = setTimeout(() => {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 5000);
        }, 0);
        return () => clearTimeout(timer);
      }
    }
  }, [game.gameOverInfo, game.gameMode, saveGameResult]);

  const handleThemeToggle = () => {
    document.body.classList.toggle('dark-mode');
    const newTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const handleGameModeChange = (mode) => {
    game.setGameMode(mode);
  };

  const handlePlayerColorChange = (color) => {
    game.setPlayerColor(color);
    game.setComputerColor(color === 'black' ? 'white' : 'black');
    setPlayerColorStorage(color);
  };

  const handleBlackPlayerNameChange = (name) => {
    const playerName = name.trim() || 'Black';
    game.setBlackPlayerName(playerName);
    setBlackNameStorage(playerName);
  };

  const handleWhitePlayerNameChange = (name) => {
    const playerName = name.trim() || 'White';
    game.setWhitePlayerName(playerName);
    setWhiteNameStorage(playerName);
  };

  const handleNewGame = () => {
    game.initGame();
  };

  const handlePlayAgain = () => {
    game.initGame();
  };

  const scores = game.getScores();

  return (
    <div className="container">
      <Header
        onThemeToggle={handleThemeToggle}
        onColorSettings={() => setShowColorModal(true)}
        onLeaderboard={() => setShowLeaderboard(true)}
      />
      <GameInfo
        blackScore={scores.blackScore}
        whiteScore={scores.whiteScore}
        currentPlayer={game.currentPlayer}
        gameMode={game.gameMode}
        computerColor={game.computerColor}
        blackPlayerName={game.blackPlayerName}
        whitePlayerName={game.whitePlayerName}
      />
      <Board
        board={game.board}
        currentPlayer={game.currentPlayer}
        gameActive={game.gameActive}
        lastComputerMove={game.lastComputerMove}
        isValidMove={game.isValidMove}
        handleCellClick={game.handleCellClick}
      />
      <GameControls
        gameMode={game.gameMode}
        playerColor={game.playerColor}
        onGameModeChange={handleGameModeChange}
        onPlayerColorChange={handlePlayerColorChange}
        onNewGame={handleNewGame}
        blackPlayerName={game.blackPlayerName}
        whitePlayerName={game.whitePlayerName}
        onBlackPlayerNameChange={handleBlackPlayerNameChange}
        onWhitePlayerNameChange={handleWhitePlayerNameChange}
      />
      <GameOverModal
        gameOverInfo={game.gameOverInfo}
        onPlayAgain={handlePlayAgain}
      />
      <ColorModal
        show={showColorModal}
        onClose={() => setShowColorModal(false)}
      />
      <LeaderboardModal
        show={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
      />
      <Confetti show={showConfetti} />
    </div>
  );
}

export default App;
