import './Board.css';

const Board = ({ board, currentPlayer, gameActive, lastComputerMove, isValidMove, handleCellClick }) => {
  // Guard against undefined board
  if (!board || board.length === 0) {
    return <div className="board">Loading...</div>;
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
