import { useState } from 'react';
import './Modal.css';

const ColorModal = ({ show, onClose }) => {
  const [boardColor, setBoardColor] = useState(() => {
    return localStorage.getItem('boardColor') || '#2d8659';
  });
  const [blackPieceColor, setBlackPieceColor] = useState(() => {
    return localStorage.getItem('blackPieceColor') || '#000000';
  });
  const [whitePieceColor, setWhitePieceColor] = useState(() => {
    return localStorage.getItem('whitePieceColor') || '#ffffff';
  });

  const handleApply = () => {
    document.documentElement.style.setProperty('--board-color', boardColor);
    document.documentElement.style.setProperty('--black-piece', blackPieceColor);
    document.documentElement.style.setProperty('--white-piece', whitePieceColor);

    localStorage.setItem('boardColor', boardColor);
    localStorage.setItem('blackPieceColor', blackPieceColor);
    localStorage.setItem('whitePieceColor', whitePieceColor);

    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Customize Colors</h2>
        <div className="color-picker-group">
          <label htmlFor="boardColor">Board Color:</label>
          <input
            type="color"
            id="boardColor"
            value={boardColor}
            onChange={(e) => setBoardColor(e.target.value)}
          />
        </div>
        <div className="color-picker-group">
          <label htmlFor="blackPieceColor">Black Pieces:</label>
          <input
            type="color"
            id="blackPieceColor"
            value={blackPieceColor}
            onChange={(e) => setBlackPieceColor(e.target.value)}
          />
        </div>
        <div className="color-picker-group">
          <label htmlFor="whitePieceColor">White Pieces:</label>
          <input
            type="color"
            id="whitePieceColor"
            value={whitePieceColor}
            onChange={(e) => setWhitePieceColor(e.target.value)}
          />
        </div>
        <div className="modal-actions">
          <button onClick={handleApply} className="btn btn-primary">Apply</button>
          <button onClick={onClose} className="btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ColorModal;
