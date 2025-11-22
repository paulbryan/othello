import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import type { GameColors } from '../types';

interface ColorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (colors: GameColors) => void;
  initialColors: GameColors;
}

export default function ColorModal({ isOpen, onClose, onApply, initialColors }: ColorModalProps) {
  const [colors, setColors] = useState<GameColors>(initialColors);
  const [activeColor, setActiveColor] = useState<'boardColor' | 'blackPieceColor' | 'whitePieceColor'>('boardColor');

  const handleColorChange = (color: string) => {
    setColors(prev => ({ ...prev, [activeColor]: color }));
  };

  const handleApply = () => {
    onApply(colors);
    onClose();
  };

  const handleReset = () => {
    const defaultColors: GameColors = {
      boardColor: '#2d8659',
      blackPieceColor: '#000000',
      whitePieceColor: '#ffffff',
    };
    setColors(defaultColors);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isOpen}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Customize Colors</Text>

          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, activeColor === 'boardColor' && styles.activeTab]}
              onPress={() => setActiveColor('boardColor')}
            >
              <Text style={[styles.tabText, activeColor === 'boardColor' && styles.activeTabText]}>Board</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeColor === 'blackPieceColor' && styles.activeTab]}
              onPress={() => setActiveColor('blackPieceColor')}
            >
              <Text style={[styles.tabText, activeColor === 'blackPieceColor' && styles.activeTabText]}>Black</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeColor === 'whitePieceColor' && styles.activeTab]}
              onPress={() => setActiveColor('whitePieceColor')}
            >
              <Text style={[styles.tabText, activeColor === 'whitePieceColor' && styles.activeTabText]}>White</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.pickerContainer}>
            <ColorPicker
              color={colors[activeColor]}
              onColorChangeComplete={handleColorChange}
              thumbSize={30}
              sliderSize={30}
              noSnap={true}
              row={false}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={handleReset}>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.applyButton]} onPress={handleApply}>
              <Text style={styles.buttonText}>Apply</Text>
            </TouchableOpacity>
          </View>
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
    height: '70%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 20,
    width: '100%',
    justifyContent: 'space-around',
  },
  tab: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#2d8659',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#2d8659',
    fontWeight: 'bold',
  },
  pickerContainer: {
    flex: 1,
    width: '100%',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: '30%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#999',
  },
  resetButton: {
    backgroundColor: '#ff9800',
  },
  applyButton: {
    backgroundColor: '#2d8659',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
