// AsyncStorage hook for React Native
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

export function useAsyncStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = AsyncStorage.getItem(key);
      // AsyncStorage.getItem returns a Promise, so we initialize with initialValue and load actual value in effect.
      return initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Load stored value on mount
  useEffect(() => {
    let isMounted = true;
    AsyncStorage.getItem(key)
      .then(stored => {
        if (isMounted && stored !== null) {
          try {
            setValue(JSON.parse(stored) as T);
          } catch (e) {
            console.error('Failed to parse stored value', e);
          }
        }
      })
      .catch(err => console.error(err));
    return () => {
      isMounted = false;
    };
  }, [key]);

  // Persist changes
  useEffect(() => {
    AsyncStorage.setItem(key, JSON.stringify(value)).catch(err => console.error(err));
  }, [key, value]);

  return [value, setValue];
}
