import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

interface ConfettiProps {
  active: boolean;
}

export default function Confetti({ active }: ConfettiProps) {
  const cannonRef = useRef<ConfettiCannon>(null);
  const windowWidth = Dimensions.get('window').width;

  useEffect(() => {
    if (active && cannonRef.current) {
      cannonRef.current.start();
    }
  }, [active]);

  if (!active) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      <ConfettiCannon
        ref={cannonRef}
        count={200}
        origin={{ x: -10, y: 0 }}
        autoStart={true}
        fadeOut={true}
        fallSpeed={3000}
        explosionSpeed={350}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
});
