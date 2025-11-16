import { useCallback } from 'react';

export const useGameHistory = () => {
  const saveGameResult = (blackName, whiteName, blackScore, whiteScore, winner, gameMode) => {
    try {
      const history = getGameHistory();
      const gameResult = {
        blackPlayer: blackName,
        whitePlayer: whiteName,
        blackScore: blackScore,
        whiteScore: whiteScore,
        winner: winner,
        date: new Date().toISOString(),
        gameMode: gameMode
      };

      history.unshift(gameResult);

      // Keep only the last 50 games
      if (history.length > 50) {
        history.splice(50);
      }

      localStorage.setItem('othelloHistory', JSON.stringify(history));
    } catch (e) {
      console.error('Failed to save game result:', e);
    }
  };

  const getGameHistory = () => {
    try {
      const historyStr = localStorage.getItem('othelloHistory');
      return historyStr ? JSON.parse(historyStr) : [];
    } catch (e) {
      console.error('Failed to load game history:', e);
      return [];
    }
  };

  return { saveGameResult, getGameHistory };
};

export const useLocalStorage = (key, defaultValue) => {
  const getValue = useCallback(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? item : defaultValue;
    } catch (e) {
      console.error(`Failed to get ${key} from localStorage:`, e);
      return defaultValue;
    }
  }, [key, defaultValue]);

  const setValue = useCallback((value) => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.error(`Failed to set ${key} in localStorage:`, e);
    }
  }, [key]);

  return { getValue, setValue };
};
