import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import type { Winner, Scores } from '../types';

interface GameOverProps {
  isOpen: boolean;
  winner: Winner;
  scores: Scores;
  blackName: string;
  whiteName: string;
  onPlayAgain: () => void;
}

export default function GameOver({
  isOpen,
  winner,
  scores,
  blackName,
  whiteName,
  onPlayAgain,
}: GameOverProps) {
  if (!isOpen || !winner) return null;

  const getWinnerText = () => {
    if (winner === 'tie') return "It's a Tie!";
    const winnerName = winner === 'black' ? blackName : whiteName;
    return `${winnerName} Wins!`;
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isOpen}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Game Over</Text>
          
          <Text style={styles.winnerText}>{getWinnerText()}</Text>
          
          <View style={styles.scoreContainer}>
            <View style={styles.scoreItem}>
              <Text style={styles.playerLabel}>{blackName} (Black)</Text>
              <Text style={styles.scoreValue}>{scores.black}</Text>
            </View>
            <View style={styles.scoreItem}>
              <Text style={styles.playerLabel}>{whiteName} (White)</Text>
              <Text style={styles.scoreValue}>{scores.white}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={onPlayAgain}>
            <Text style={styles.buttonText}>Play Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  winnerText: {
    fontSize: 20,
    marginBottom: 20,
    color: '#2d8659',
    fontWeight: 'bold',
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 25,
  },
  scoreItem: {
    alignItems: 'center',
  },
  playerLabel: {
    fontSize: 14,
    marginBottom: 5,
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#2d8659',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
