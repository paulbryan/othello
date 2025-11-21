// Game types
export type Player = 'black' | 'white';
export type CellValue = Player | null;
export type Board = CellValue[][];
export type GameMode = 'pvp' | 'pvc';
export type Winner = Player | 'tie' | null;
export type Position = [number, number];

// Score interface
export interface Scores {
  black: number;
  white: number;
}

// Color customization
export interface GameColors {
  boardColor: string;
  blackPieceColor: string;
  whitePieceColor: string;
}

// Leaderboard entry
export interface LeaderboardEntry {
  blackPlayer: string;
  whitePlayer: string;
  blackScore: number;
  whiteScore: number;
  winner: Winner;
  date: string;
  gameMode: GameMode;
}
