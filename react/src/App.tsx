import { useState, useEffect } from 'react'
import Board from './components/Board'
import GameOver from './components/GameOver'
import ColorModal from './components/ColorModal'
import Leaderboard from './components/Leaderboard'
import Confetti from './components/Confetti'
import { useOthello } from './hooks/useOthello'
import { useLocalStorage } from './hooks/useLocalStorage'
import type { GameColors, LeaderboardEntry, GameMode, Player } from './types'
import './index.css'

function App() {
  // Theme
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light')
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [theme])

  // Colors
  const [colors, setColors] = useLocalStorage<GameColors>('colors', {
    boardColor: '#2d8659',
    blackPieceColor: '#000000',
    whitePieceColor: '#ffffff'
  })

  useEffect(() => {
    document.documentElement.style.setProperty('--board-color', colors.boardColor)
    document.documentElement.style.setProperty('--black-piece', colors.blackPieceColor)
    document.documentElement.style.setProperty('--white-piece', colors.whitePieceColor)
  }, [colors])

  // Player Names
  const [blackName, setBlackName] = useLocalStorage<string>('blackPlayerName', 'Black')
  const [whiteName, setWhiteName] = useLocalStorage<string>('whitePlayerName', 'White')

  // Leaderboard
  const [leaderboard, setLeaderboard] = useLocalStorage<LeaderboardEntry[]>('othelloHistory', [])
  const [showLeaderboard, setShowLeaderboard] = useState(false)

  // Game Logic
  const {
    board,
    currentPlayer,
    gameMode,
    setGameMode,
    playerColor,
    setPlayerColor,
    gameActive,
    lastComputerMove,
    winner,
    resetGame,
    handleCellClick,
    scores,
    validMoves
  } = useOthello()

  // Modals
  const [showColorModal, setShowColorModal] = useState(false)

  // Save game result
  useEffect(() => {
    if (!gameActive && winner) {
      const blackPlayer = gameMode === 'pvc' && playerColor === 'white' ? 'Computer' : blackName
      const whitePlayer = gameMode === 'pvc' && playerColor === 'black' ? 'Computer' : whiteName
      
      const newEntry = {
        blackPlayer,
        whitePlayer,
        blackScore: scores.black,
        whiteScore: scores.white,
        winner,
        date: new Date().toISOString(),
        gameMode
      }
      
      setLeaderboard(prev => {
        const newHistory = [newEntry, ...prev]
        return newHistory.slice(0, 50)
      })
    }
  }, [gameActive, winner]) // eslint-disable-line react-hooks/exhaustive-deps

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const handleNewGame = () => {
    resetGame()
  }

  const handleClearLeaderboard = () => {
    setLeaderboard([])
  }

  const isComputerTurn = gameMode === 'pvc' && currentPlayer !== playerColor

  return (
    <div className="container">
      <Confetti active={!!(winner && winner !== 'tie' && 
        ((winner === 'black' && playerColor === 'black') || (winner === 'white' && playerColor === 'white') || gameMode === 'pvp'))} />

      <header>
        <h1>Othello</h1>
        <div className="controls">
          <button className="btn" onClick={toggleTheme}>
            {theme === 'dark' ? '☀️ Light Mode' : '🌓 Dark Mode'}
          </button>
          <button className="btn" onClick={() => setShowColorModal(true)}>🎨 Colors</button>
          <button className="btn" onClick={() => setShowLeaderboard(true)}>🏆 Leaderboard</button>
        </div>
      </header>

      <div className="game-info">
        <div className="score-section">
          <div className="player-score">
            <div className="score-label">
              <span className="piece black-piece"></span>
              <span>Black</span>
            </div>
            <div className="score">{scores.black}</div>
          </div>
          <div className="player-score">
            <div className="score-label">
              <span className="piece white-piece"></span>
              <span>White</span>
            </div>
            <div className="score">{scores.white}</div>
          </div>
        </div>
        <div className="current-player">
          {isComputerTurn ? `Computer (${currentPlayer === 'black' ? 'Black' : 'White'})` : 
           `${currentPlayer === 'black' ? blackName : whiteName}'s Turn`}
        </div>
      </div>

      <Board
        board={board}
        validMoves={validMoves}
        lastComputerMove={lastComputerMove}
        onCellClick={handleCellClick}
      />

      <div className="game-controls">
        <button id="newGame" onClick={handleNewGame} className="btn btn-primary">New Game</button>
        
        <div className="mode-selection">
          <label>
            <input
              type="radio"
              name="gameMode"
              value="pvp"
              checked={gameMode === 'pvp'}
              onChange={(e) => setGameMode(e.target.value as GameMode)}
            />
            Player vs Player
          </label>
          <label>
            <input
              type="radio"
              name="gameMode"
              value="pvc"
              checked={gameMode === 'pvc'}
              onChange={(e) => setGameMode(e.target.value as GameMode)}
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
                onChange={(e) => setPlayerColor(e.target.value as Player)}
              />
              Black
            </label>
            <label>
              <input
                type="radio"
                name="playerColor"
                value="white"
                checked={playerColor === 'white'}
                onChange={(e) => setPlayerColor(e.target.value as Player)}
              />
              White
            </label>
          </div>
        ) : (
          <div className="player-names">
            <div className="name-input-group">
              <label>Black Player:</label>
              <input
                type="text"
                value={blackName}
                onChange={(e) => setBlackName(e.target.value)}
                maxLength={20}
              />
            </div>
            <div className="name-input-group">
              <label>White Player:</label>
              <input
                type="text"
                value={whiteName}
                onChange={(e) => setWhiteName(e.target.value)}
                maxLength={20}
              />
            </div>
          </div>
        )}
      </div>

      <GameOver
        isOpen={!gameActive}
        winner={winner}
        scores={scores}
        blackName={gameMode === 'pvc' && playerColor === 'white' ? 'Computer' : blackName}
        whiteName={gameMode === 'pvc' && playerColor === 'black' ? 'Computer' : whiteName}
        onPlayAgain={handleNewGame}
      />

      <ColorModal
        isOpen={showColorModal}
        onClose={() => setShowColorModal(false)}
        onApply={setColors}
        initialColors={colors}
      />

      {showLeaderboard && (
        <Leaderboard
          history={leaderboard}
          onClose={() => setShowLeaderboard(false)}
          onClear={handleClearLeaderboard}
        />
      )}
    </div>
  )
}

export default App
