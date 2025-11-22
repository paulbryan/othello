import { View, TouchableOpacity, StyleSheet, type ViewStyle } from 'react-native';
import type { CellValue, GameColors } from '../types';

interface CellProps {
  value: CellValue;
  isValidMove: boolean;
  onClick: () => void;
  colors: GameColors;
  size: number;
  style: ViewStyle;
  isLastMove?: boolean;
}

export default function Cell({ value, isValidMove, onClick, colors, isLastMove }: Omit<CellProps, 'size' | 'style'>) {
  return (
    <TouchableOpacity
      style={styles.cell}
      onPress={onClick}
      disabled={!isValidMove && !value}
      activeOpacity={isValidMove ? 0.6 : 1}
      testID="cell"
    >
      {value && (
        <View
          style={[
            styles.piece,
            {
              backgroundColor: value === 'black' ? colors.blackPieceColor : colors.whitePieceColor,
            },
          ]}
        >
          {isLastMove && <View style={styles.lastMoveIndicator} />}
        </View>
      )}
      
      {!value && isValidMove && (
        <View style={styles.validMove} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
  piece: {
    width: '80%',
    height: '80%',
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  validMove: {
    width: '30%',
    height: '30%',
    borderRadius: 9999,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  lastMoveIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'red',
  },
});
