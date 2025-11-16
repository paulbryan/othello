import './Board.css';

const Board = ({ board, currentPlayer, gameActive, lastComputerMove, isValidMove, handleCellClick }) => {
  // Show loading skeleton if board is not ready
  if (!board || board.length === 0) {
    return (
      <div className="board board-loading">
        {Array.from({ length: 64 }).map((_, index) => (
          <div key={index} className="cell cell-loading"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="board">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isLastMove =
            lastComputerMove &&
            lastComputerMove[0] === rowIndex &&
            lastComputerMove[1] === colIndex;
          const isValid = gameActive && isValidMove(board, rowIndex, colIndex, currentPlayer);

          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`cell ${isLastMove ? 'last-move' : ''} ${isValid ? 'valid-move' : ''}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {cell && <div className={`disc ${cell}`} />}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Board;
