import React, { useState, useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Board from './components/Board';
import GameOver from './components/GameOver';
import ColorModal from './components/ColorModal';
import Leaderboard from './components/Leaderboard';
import Confetti from './components/Confetti';
import { useOthello } from './hooks/useOthello';
import { useAsyncStorage } from './hooks/useAsyncStorage';
import type { GameColors, LeaderboardEntry, GameMode, Player } from './types';

export default function App() {
  // Persistent storage
  const [theme, setTheme] = useAsyncStorage<'light' | 'dark'>('theme', 'light');
  const [colors, setColors] = useAsyncStorage<GameColors>('colors', {
    boardColor: '#2d8659',
    blackPieceColor: '#000000',
    whitePieceColor: '#ffffff',
  });
  const [blackName] = useAsyncStorage<string>('blackPlayerName', 'Black');
  const [whiteName] = useAsyncStorage<string>('whitePlayerName', 'White');
  const [leaderboard, setLeaderboard] = useAsyncStorage<LeaderboardEntry[]>('othelloHistory', []);

  // UI state
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showColorModal, setShowColorModal] = useState(false);

  // Game logic hook
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
    validMoves,
  } = useOthello();

  const isComputerTurn = gameMode === 'pvc' && currentPlayer !== playerColor;

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  const handleNewGame = () => resetGame();

  const handleClearLeaderboard = () => setLeaderboard([]);

  // Save game result to leaderboard when game ends
  useEffect(() => {
    if (!gameActive && winner) {
      const blackPlayer = gameMode === 'pvc' && playerColor === 'white' ? 'Computer' : blackName;
      const whitePlayer = gameMode === 'pvc' && playerColor === 'black' ? 'Computer' : whiteName;
      const newEntry: LeaderboardEntry = {
        blackPlayer,
        whitePlayer,
        blackScore: scores.black,
        whiteScore: scores.white,
        winner,
        date: new Date().toISOString(),
        gameMode,
      };
      setLeaderboard(prev => [newEntry, ...prev].slice(0, 50));
    }
  }, [gameActive, winner]);

  // Theme-based colors
  const backgroundColor = theme === 'dark' ? '#1a1a1a' : '#ffffff';
  const textColor = theme === 'dark' ? '#ffffff' : '#000000';
  
  const themeStyles = {
    text: { color: textColor },
    container: { backgroundColor },
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, themeStyles.container]}>
        <Confetti
          active={!!(
            winner &&
            winner !== 'tie' &&
            ((winner === 'black' && playerColor === 'black') ||
              (winner === 'white' && playerColor === 'white') ||
              gameMode === 'pvp')
          )}
        />
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={[styles.title, themeStyles.text]}>Othello</Text>
            <View style={styles.controls}>
              <TouchableOpacity style={styles.btn} onPress={toggleTheme}>
                <Text>{theme === 'dark' ? '☀️ Light Mode' : '🌓 Dark Mode'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn} onPress={() => setShowColorModal(true)}>
                <Text>🎨 Colors</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn} onPress={() => setShowLeaderboard(true)}>
                <Text>🏆 Leaderboard</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.gameInfo}>
            <View style={styles.scoreSection}>
              <View style={styles.playerScore}>
                <Text style={[styles.scoreLabel, themeStyles.text]}>Black</Text>
                <Text style={[styles.score, themeStyles.text]}>{scores.black}</Text>
              </View>
              <View style={styles.playerScore}>
                <Text style={[styles.scoreLabel, themeStyles.text]}>White</Text>
                <Text style={[styles.score, themeStyles.text]}>{scores.white}</Text>
              </View>
            </View>
            <Text style={[styles.currentPlayer, themeStyles.text]}>
              {isComputerTurn
                ? `Computer (${currentPlayer === 'black' ? 'Black' : 'White'})`
                : `${currentPlayer === 'black' ? blackName : whiteName}'s Turn`}
            </Text>
          </View>

          <Board
            board={board}
            validMoves={validMoves}
            lastComputerMove={lastComputerMove}
            onCellClick={handleCellClick}
            colors={colors}
          />

          <View style={styles.gameControls}>
            <TouchableOpacity style={styles.primaryBtn} onPress={handleNewGame}>
              <Text style={styles.primaryBtnText}>New Game</Text>
            </TouchableOpacity>

            <View style={styles.modeSelection}>
              <TouchableOpacity onPress={() => setGameMode('pvp')}>
                <Text style={gameMode === 'pvp' ? styles.selected : themeStyles.text}>Player vs Player</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setGameMode('pvc')}>
                <Text style={gameMode === 'pvc' ? styles.selected : themeStyles.text}>Player vs Computer</Text>
              </TouchableOpacity>
            </View>

            {gameMode === 'pvc' && (
              <View style={styles.colorSelection}>
                <Text style={themeStyles.text}>Play as:</Text>
                <TouchableOpacity onPress={() => setPlayerColor('black')}>
                  <Text style={playerColor === 'black' ? styles.selected : themeStyles.text}>Black</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPlayerColor('white')}>
                  <Text style={playerColor === 'white' ? styles.selected : themeStyles.text}>White</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>

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
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  controls: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 8,
  },
  btn: {
    marginHorizontal: 4,
    marginVertical: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
  },
  gameInfo: {
    marginBottom: 16,
  },
  scoreSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  playerScore: {
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 14,
    color: '#666',
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
  currentPlayer: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  gameControls: {
    marginTop: 20,
    alignItems: 'center',
    paddingBottom: 20,
  },
  primaryBtn: {
    backgroundColor: '#2d8659',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
    minWidth: 140,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  modeSelection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 12,
    gap: 16,
  },
  colorSelection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    gap: 12,
  },
  selected: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#2d8659',
  },
});
