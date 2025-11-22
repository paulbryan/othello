import { useState, useEffect, useCallback } from 'react'
import { createInitialBoard, getValidMoves, calculateFlips, evaluateMove, getScores, isValidMove } from '../utils/gameLogic'
import type { Board, Player, GameMode, Winner, Position } from '../types'

const COMPUTER_TURN_DELAY = 1000

export function useOthello() {
  const [board, setBoard] = useState<Board>(createInitialBoard)
  const [currentPlayer, setCurrentPlayer] = useState<Player>('black')
  const [gameMode, setGameMode] = useState<GameMode>('pvc')
  const [playerColor, setPlayerColor] = useState<Player>('black')
  const [gameActive, setGameActive] = useState<boolean>(true)
  const [lastComputerMove, setLastComputerMove] = useState<Position | null>(null)
  const [winner, setWinner] = useState<Winner>(null)

  const computerColor: Player = playerColor === 'black' ? 'white' : 'black'

  const resetGame = useCallback(() => {
    setBoard(createInitialBoard())
    setCurrentPlayer('black')
    setGameActive(true)
    setLastComputerMove(null)
    setWinner(null)
  }, [])


  // Better approach:
  // makeMove updates board.
  // Then we need to switch player.
  // But we also need to check if the NEXT player has moves.
  
  const handleTurnEnd = useCallback((currentBoard: Board, nextPlayer: Player) => {
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

  const handleCellClick = (row: number, col: number) => {
    if (!gameActive) return
    if (gameMode === 'pvc' && currentPlayer === computerColor) return

    // Validate the move is legal
    if (!isValidMove(board, row, col, currentPlayer)) return

    const flips = calculateFlips(board, row, col, currentPlayer)

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

        let bestMove: Position | null = null
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
