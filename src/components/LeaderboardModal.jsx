import { useState, useEffect, useCallback } from 'react';
import './Modal.css';

const LeaderboardModal = ({ show, onClose }) => {
  const [history, setHistory] = useState([]);

  const loadHistory = useCallback(() => {
    try {
      const historyStr = localStorage.getItem('othelloHistory');
      const gameHistory = historyStr ? JSON.parse(historyStr) : [];
      return gameHistory;
    } catch (e) {
      console.error('Failed to load game history:', e);
      return [];
    }
  }, []);

  useEffect(() => {
    if (show) {
      const gameHistory = loadHistory();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHistory(gameHistory);
    }
  }, [show, loadHistory]);

  const clearHistory = () => {
    if (confirm('Are you sure you want to clear all game history? This cannot be undone.')) {
      localStorage.removeItem('othelloHistory');
      setHistory([]);
    }
  };

  const escapeHtml = (text) => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content leaderboard-content">
        <h2>🏆 Leaderboard</h2>
        <div className="leaderboard-list">
          {history.length === 0 ? (
            <div className="leaderboard-empty">
              No games played yet. Start playing to build your history!
            </div>
          ) : (
            history.map((game, index) => {
              const date = new Date(game.date);
              const dateStr = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

              let winnerClass = '';
              let resultText = '';

              if (game.winner === 'black') {
                winnerClass = 'winner-black';
                resultText = `${escapeHtml(game.blackPlayer)} won`;
              } else if (game.winner === 'white') {
                winnerClass = 'winner-white';
                resultText = `${escapeHtml(game.whitePlayer)} won`;
              } else {
                winnerClass = 'tie';
                resultText = 'Tie game';
              }

              return (
                <div key={index} className={`leaderboard-item ${winnerClass}`}>
                  <div className="leaderboard-header">
                    <span className="leaderboard-players">{resultText}</span>
                  </div>
                  <div className="leaderboard-score">
                    <span>⚫ {game.blackPlayer}: {game.blackScore}</span>
                    <span>⚪ {game.whitePlayer}: {game.whiteScore}</span>
                  </div>
                  <div className="leaderboard-date">{dateStr}</div>
                </div>
              );
            })
          )}
        </div>
        <div className="modal-actions">
          <button onClick={clearHistory} className="btn btn-danger">Clear History</button>
          <button onClick={onClose} className="btn">Close</button>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardModal;
