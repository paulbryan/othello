import type { LeaderboardEntry } from '../types'

interface LeaderboardProps {
  history: LeaderboardEntry[];
  onClose: () => void;
  onClear: () => void;
}

function Leaderboard({ history, onClose, onClear }: LeaderboardProps) {
  return (
    <div className="modal">
      <div className="modal-content leaderboard-content">
        <h2>🏆 Leaderboard</h2>
        <div className="leaderboard-list">
          {history.length === 0 ? (
            <div className="leaderboard-empty">No games played yet. Start playing to build your history!</div>
          ) : (
            history.map((game, index) => {
              const date = new Date(game.date)
              const dateStr = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
              
              let winnerClass = ''
              let resultText = ''
              
              if (game.winner === 'black') {
                winnerClass = 'winner-black'
                resultText = `${game.blackPlayer} won`
              } else if (game.winner === 'white') {
                winnerClass = 'winner-white'
                resultText = `${game.whitePlayer} won`
              } else {
                winnerClass = 'tie'
                resultText = 'Tie game'
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
              )
            })
          )}
        </div>
        <div className="modal-actions">
          <button onClick={onClear} className="btn btn-danger">Clear History</button>
          <button onClick={onClose} className="btn">Close</button>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard
