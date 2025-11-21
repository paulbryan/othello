import React, { useState, useEffect } from 'react'

function ColorModal({ isOpen, onClose, onApply, initialColors }) {
  const [colors, setColors] = useState(initialColors)

  useEffect(() => {
    if (isOpen) {
      setColors(initialColors)
    }
  }, [isOpen, initialColors])

  const handleChange = (key, value) => {
    setColors(prev => ({ ...prev, [key]: value }))
  }

  const handleApply = () => {
    onApply(colors)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Customize Colors</h2>
        <div className="color-picker-group">
          <label htmlFor="boardColor">Board Color:</label>
          <input
            type="color"
            id="boardColor"
            value={colors.boardColor}
            onChange={(e) => handleChange('boardColor', e.target.value)}
          />
        </div>
        <div className="color-picker-group">
          <label htmlFor="blackPieceColor">Black Pieces:</label>
          <input
            type="color"
            id="blackPieceColor"
            value={colors.blackPieceColor}
            onChange={(e) => handleChange('blackPieceColor', e.target.value)}
          />
        </div>
        <div className="color-picker-group">
          <label htmlFor="whitePieceColor">White Pieces:</label>
          <input
            type="color"
            id="whitePieceColor"
            value={colors.whitePieceColor}
            onChange={(e) => handleChange('whitePieceColor', e.target.value)}
          />
        </div>
        <div className="modal-actions">
          <button onClick={handleApply} className="btn btn-primary">Apply</button>
          <button onClick={onClose} className="btn">Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default ColorModal
