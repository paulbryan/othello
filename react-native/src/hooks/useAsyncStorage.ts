// AsyncStorage hook for React Native
import type { Dispatch, SetStateAction } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, useRef } from 'react';

export function useAsyncStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(initialValue);
  const isInitialMount = useRef(true);

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
        isInitialMount.current = false;
      })
      .catch(err => console.error(err));
    return () => {
      isMounted = false;
    };
  }, [key]);

  // Persist changes (skip on initial mount to avoid race condition)
  useEffect(() => {
    if (!isInitialMount.current) {
      AsyncStorage.setItem(key, JSON.stringify(value)).catch(err => console.error(err));
    }
  }, [key, value]);

  return [value, setValue];
}
