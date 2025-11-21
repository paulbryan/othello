import { useState, useEffect, useCallback } from 'react'
import { createInitialBoard, getValidMoves, calculateFlips, evaluateMove, getScores } from '../utils/gameLogic'

const COMPUTER_TURN_DELAY = 1000

export function useOthello() {
  const [board, setBoard] = useState(createInitialBoard)
  const [currentPlayer, setCurrentPlayer] = useState('black')
  const [gameMode, setGameMode] = useState('pvc') // 'pvp' or 'pvc'
  const [playerColor, setPlayerColor] = useState('black') // For PvC
  const [gameActive, setGameActive] = useState(true)
  const [lastComputerMove, setLastComputerMove] = useState(null)
  const [winner, setWinner] = useState(null)

  const computerColor = playerColor === 'black' ? 'white' : 'black'

  const resetGame = useCallback(() => {
    setBoard(createInitialBoard())
    setCurrentPlayer('black')
    setGameActive(true)
    setLastComputerMove(null)
    setWinner(null)
  }, [])

  const makeMove = useCallback((row, col) => {
    if (!gameActive) return false
    
    const flips = calculateFlips(board, row, col, currentPlayer)
    if (flips.length === 0) return false

    const newBoard = board.map(r => [...r])
    newBoard[row][col] = currentPlayer
    flips.forEach(([r, c]) => {
      newBoard[r][c] = currentPlayer
    })

    setBoard(newBoard)
    
    // Switch player logic handled in useEffect to support skipping turns
    return true
  }, [board, currentPlayer, gameActive])

  // Handle turn switching and game over check
  useEffect(() => {
    if (!gameActive) return

    const opponent = currentPlayer === 'black' ? 'white' : 'black'
    const opponentMoves = getValidMoves(board, opponent)
    const currentMoves = getValidMoves(board, currentPlayer)

    // Check if move was just made (board changed)
    // This effect runs on board change. 
    // But we need to be careful not to loop.
    // Actually, makeMove updates board. Then we check if we should switch.
    
    // Wait, this logic is tricky in React.
    // Let's do it explicitly in makeMove or a separate effect that watches board/currentPlayer.
  }, [board, currentPlayer, gameActive])

  // Better approach:
  // makeMove updates board.
  // Then we need to switch player.
  // But we also need to check if the NEXT player has moves.
  
  const handleTurnEnd = useCallback((currentBoard, nextPlayer) => {
    const nextPlayerMoves = getValidMoves(currentBoard, nextPlayer)
    
    if (nextPlayerMoves.length > 0) {
      setCurrentPlayer(nextPlayer)
    } else {
      // Next player has no moves. Check if original player has moves.
      const originalPlayer = nextPlayer === 'black' ? 'white' : 'black'
      const originalPlayerMoves = getValidMoves(currentBoard, originalPlayer)
      
      if (originalPlayerMoves.length > 0) {
        // Keep current player (original player plays again)
        setCurrentPlayer(originalPlayer)
        // Note: if original player is computer, we need to trigger it again.
      } else {
        // Game Over
        setGameActive(false)
        const scores = getScores(currentBoard)
        if (scores.black > scores.white) setWinner('black')
        else if (scores.white > scores.black) setWinner('white')
        else setWinner('tie')
      }
    }
  }, [])

  const handleCellClick = (row, col) => {
    if (!gameActive) return
    if (gameMode === 'pvc' && currentPlayer === computerColor) return

    const flips = calculateFlips(board, row, col, currentPlayer)
    if (flips.length === 0) return

    const newBoard = board.map(r => [...r])
    newBoard[row][col] = currentPlayer
    flips.forEach(([r, c]) => {
      newBoard[r][c] = currentPlayer
    })

    setBoard(newBoard)
    setLastComputerMove(null)
    
    const nextPlayer = currentPlayer === 'black' ? 'white' : 'black'
    handleTurnEnd(newBoard, nextPlayer)
  }

  // Computer Move Effect
  useEffect(() => {
    if (gameMode === 'pvc' && currentPlayer === computerColor && gameActive) {
      const timer = setTimeout(() => {
        const validMoves = getValidMoves(board, computerColor)
        if (validMoves.length === 0) {
            // Should have been handled by handleTurnEnd, but just in case
            const nextPlayer = computerColor === 'black' ? 'white' : 'black'
            handleTurnEnd(board, nextPlayer)
            return
        }

        let bestMove = null
        let bestScore = -Infinity

        for (const [row, col] of validMoves) {
            let score = evaluateMove(board, row, col, computerColor)
            if (score > bestScore) {
                bestScore = score
                bestMove = [row, col]
            }
        }

        if (bestMove) {
            const [row, col] = bestMove
            const flips = calculateFlips(board, row, col, computerColor)
            
            const newBoard = board.map(r => [...r])
            newBoard[row][col] = computerColor
            flips.forEach(([r, c]) => {
                newBoard[r][c] = computerColor
            })

            setBoard(newBoard)
            setLastComputerMove(bestMove)
            
            const nextPlayer = computerColor === 'black' ? 'white' : 'black'
            handleTurnEnd(newBoard, nextPlayer)
        }
      }, COMPUTER_TURN_DELAY)

      return () => clearTimeout(timer)
    }
  }, [currentPlayer, gameMode, computerColor, gameActive, board, handleTurnEnd])

  // Initial computer move if computer is black
  useEffect(() => {
      if (gameMode === 'pvc' && computerColor === 'black' && currentPlayer === 'black' && gameActive) {
          // This is covered by the general computer move effect
      }
  }, [gameMode, computerColor, currentPlayer, gameActive])

  return {
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
    scores: getScores(board),
    validMoves: getValidMoves(board, currentPlayer)
  }
}
