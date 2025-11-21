import React from 'react'
import classNames from 'classnames'

function Cell({ row, col, value, isValidMove, isLastMove, onClick }) {
  return (
    <div
      className={classNames('cell', {
        'valid-move': isValidMove,
        'last-move': isLastMove,
      })}
      data-row={row}
      data-col={col}
      onClick={() => onClick(row, col)}
    >
      {value && (
        <div
          className={classNames('disc', value)}
        />
      )}
    </div>
  )
}

export default Cell
