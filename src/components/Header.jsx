import './Header.css';

const Header = ({ onThemeToggle, onColorSettings, onLeaderboard }) => {
  return (
    <header>
      <h1>Othello</h1>
      <div className="controls">
        <button onClick={onThemeToggle} className="btn">🌓 Toggle Theme</button>
        <button onClick={onColorSettings} className="btn">🎨 Colors</button>
        <button onClick={onLeaderboard} className="btn">🏆 Leaderboard</button>
      </div>
    </header>
  );
};

export default Header;
