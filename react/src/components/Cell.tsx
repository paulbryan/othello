import classNames from 'classnames'
import type { CellValue } from '../types'

interface CellProps {
  row: number;
  col: number;
  value: CellValue;
  isValidMove: boolean;
  isLastMove: boolean;
  onClick: (row: number, col: number) => void;
}

function Cell({ row, col, value, isValidMove, isLastMove, onClick }: CellProps) {
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
