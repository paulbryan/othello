import { createInitialBoard, isValidMove, getValidMoves, calculateFlips, getScores } from '../../utils/gameLogic';

describe('Game Logic', () => {
  describe('createInitialBoard', () => {
    it('creates an 8x8 board', () => {
      const board = createInitialBoard();
      expect(board.length).toBe(8);
      expect(board[0].length).toBe(8);
    });

    it('has correct initial pieces', () => {
      const board = createInitialBoard();
      expect(board[3][3]).toBe('white');
      expect(board[3][4]).toBe('black');
      expect(board[4][3]).toBe('black');
      expect(board[4][4]).toBe('white');
    });
  });

  describe('getScores', () => {
    it('counts pieces correctly', () => {
      const board = createInitialBoard();
      const scores = getScores(board);
      expect(scores.black).toBe(2);
      expect(scores.white).toBe(2);
    });
  });

  describe('getValidMoves', () => {
    it('returns valid moves for black at start', () => {
      const board = createInitialBoard();
      const validMoves = getValidMoves(board, 'black');
      expect(validMoves.length).toBeGreaterThan(0);
      expect(validMoves).toContainEqual([2, 3]);
    });
  });

  describe('isValidMove', () => {
    it('validates correct moves', () => {
      const board = createInitialBoard();
      expect(isValidMove(board, 2, 3, 'black')).toBe(true);
      expect(isValidMove(board, 0, 0, 'black')).toBe(false);
    });
  });

  describe('calculateFlips', () => {
    it('calculates flips correctly', () => {
      const board = createInitialBoard();
      const flips = calculateFlips(board, 2, 3, 'black');
      expect(flips.length).toBeGreaterThan(0);
    });
  });
});
