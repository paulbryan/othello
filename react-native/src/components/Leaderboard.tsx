import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import type { LeaderboardEntry } from '../types';

interface LeaderboardProps {
  history: LeaderboardEntry[];
  onClose: () => void;
  onClear: () => void;
}

export default function Leaderboard({ history, onClose, onClear }: LeaderboardProps) {
  const renderItem = ({ item }: { item: LeaderboardEntry }) => {
    const date = new Date(item.date).toLocaleDateString();
    return (
      <View style={styles.entry}>
        <View style={styles.entryHeader}>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.mode}>{item.gameMode === 'pvc' ? 'PvC' : 'PvP'}</Text>
        </View>
        <View style={styles.entryContent}>
          <View style={styles.playerInfo}>
            <Text style={[styles.playerName, item.winner === 'black' && styles.winner]}>
              {item.blackPlayer} (B)
            </Text>
            <Text style={styles.score}>{item.blackScore}</Text>
          </View>
          <Text style={styles.vs}>vs</Text>
          <View style={styles.playerInfo}>
            <Text style={[styles.playerName, item.winner === 'white' && styles.winner]}>
              {item.whitePlayer} (W)
            </Text>
            <Text style={styles.score}>{item.whiteScore}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <Modal animationType="slide" transparent={true} visible={true} onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Text style={styles.title}>Leaderboard</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {history.length === 0 ? (
            <Text style={styles.emptyText}>No games played yet.</Text>
          ) : (
            <FlatList
              data={history}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              style={styles.list}
            />
          )}

          {history.length > 0 && (
            <TouchableOpacity style={styles.clearButton} onPress={onClear}>
              <Text style={styles.clearButtonText}>Clear History</Text>
            </TouchableOpacity>
          )}
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
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    height: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#666',
  },
  list: {
    width: '100%',
  },
  entry: {
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  mode: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
  },
  entryContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playerInfo: {
    alignItems: 'center',
    flex: 1,
  },
  playerName: {
    fontSize: 14,
    marginBottom: 2,
  },
  winner: {
    fontWeight: 'bold',
    color: '#2d8659',
  },
  score: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  vs: {
    marginHorizontal: 10,
    color: '#999',
  },
  emptyText: {
    marginTop: 50,
    color: '#666',
    fontStyle: 'italic',
  },
  clearButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#ff4444',
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  clearButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
