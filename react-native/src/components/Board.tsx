import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Cell from './Cell';
import type { Board as BoardType, Position, GameColors } from '../types';

interface BoardProps {
  board: BoardType;
  validMoves: Position[];
  lastComputerMove: Position | null;
  onCellClick: (row: number, col: number) => void;
  colors: GameColors;
}

export default function Board({ board, validMoves, lastComputerMove, onCellClick, colors }: BoardProps) {
  const screenWidth = Dimensions.get('window').width;
  // Significantly reduced size to ensure it fits on all screens
  const maxBoardSize = Math.min(screenWidth - 80, 280);
  const borderWidth = 2;
  // Account for border width (2px on each side = 4px total)
  const availableSpace = maxBoardSize - (borderWidth * 2);
  const cellSize = Math.floor(availableSpace / 8);
  // Board size includes the border width
  const boardSize = cellSize * 8 + borderWidth * 2;

  const isValidMove = (row: number, col: number) => {
    return validMoves.some(([r, c]) => r === row && c === col);
  };

  const isLastMove = (row: number, col: number) => {
    return lastComputerMove ? lastComputerMove[0] === row && lastComputerMove[1] === col : false;
  };

  return (
    <View style={styles.boardContainer}>
      <View style={[styles.board, { width: boardSize, height: boardSize, backgroundColor: colors.boardColor }]}>
        {board.map((row, rowIndex) => (
          <View key={`row-${rowIndex}`} style={styles.row}>
            {row.map((cellValue, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                value={cellValue}
                isValidMove={isValidMove(rowIndex, colIndex)}
                onClick={() => onCellClick(rowIndex, colIndex)}
                colors={colors}
                isLastMove={isLastMove(rowIndex, colIndex)}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boardContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  board: {
    borderWidth: 2,
    borderColor: '#333',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
});
