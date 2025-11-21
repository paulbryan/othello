import { useState, useEffect } from 'react'
import type { GameColors } from '../types'

interface ColorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (colors: GameColors) => void;
  initialColors: GameColors;
}

function ColorModal({ isOpen, onClose, onApply, initialColors }: ColorModalProps) {
  const [colors, setColors] = useState<GameColors>(initialColors)

  useEffect(() => {
    if (isOpen) {
      setColors(initialColors)
    }
  }, [isOpen, initialColors])

  const handleChange = (key: keyof GameColors, value: string) => {
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
