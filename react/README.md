# Othello (React + TypeScript)

A modern, fully-featured implementation of the classic Othello (Reversi) board game built with React and TypeScript.

![Othello Game](https://img.shields.io/badge/Game-Othello-green) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue) ![React](https://img.shields.io/badge/React-19.2-61dafb) ![Vite](https://img.shields.io/badge/Vite-7.2-646cff)

## Features

### Game Modes
- **Player vs Player (PvP)** - Play against a friend on the same device
- **Player vs Computer (PvC)** - Challenge an AI opponent with strategic gameplay
  - Choose to play as Black or White
  - AI uses corner and edge prioritization strategy

### Customization
- **Dark/Light Theme** - Toggle between dark and light modes
- **Custom Colors** - Personalize board and piece colors
- **Player Names** - Set custom names for both players in PvP mode
- **Persistent Settings** - All preferences saved to localStorage

### Game Features
- **Valid Move Indicators** - Visual highlights show all legal moves
- **Last Move Highlight** - Computer's last move is highlighted for clarity
- **Score Tracking** - Real-time score display for both players
- **Game History** - Leaderboard tracks up to 50 recent games
- **Confetti Animation** - Celebration effect when you win against the computer
- **Responsive Design** - Fully playable on desktop, tablet, and mobile devices

## Tech Stack

- **React 19.2** - UI framework
- **TypeScript 5.9** - Type-safe development
- **Vite 7.2** - Fast build tool and dev server
- **Playwright** - End-to-end testing
- **ESLint** - Code quality and consistency
- **classnames** - Conditional CSS class management

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

### Testing

```bash
# Run Playwright E2E tests
npx playwright test

# View test report
npx playwright show-report
```

### Linting

```bash
# Run ESLint
npm run lint
```

## Project Structure

```
react/
├── src/
│   ├── components/          # React components
│   │   ├── Board.tsx        # Game board grid
│   │   ├── Cell.tsx         # Individual board cell
│   │   ├── ColorModal.tsx   # Color customization modal
│   │   ├── Confetti.tsx     # Win celebration animation
│   │   ├── GameOver.tsx     # Game over modal
│   │   └── Leaderboard.tsx  # Game history display
│   ├── hooks/               # Custom React hooks
│   │   ├── useLocalStorage.ts  # localStorage persistence
│   │   └── useOthello.ts       # Game logic hook
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts         # Centralized types
│   ├── utils/               # Utility functions
│   │   ├── constants.ts     # Game constants
│   │   └── gameLogic.ts     # Core game logic
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # App entry point
│   └── index.css            # Global styles
├── tests/                   # Playwright E2E tests
├── public/                  # Static assets
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
├── playwright.config.ts     # Playwright configuration
└── package.json             # Dependencies and scripts
```

## Game Rules

Othello is a strategy board game for two players, played on an 8×8 board.

### Objective
Have the majority of your colored pieces on the board at the end of the game.

### How to Play
1. Black always moves first
2. Players alternate turns placing one piece per turn
3. A valid move must flip at least one opponent's piece
4. Pieces are flipped when sandwiched between the new piece and another piece of the same color
5. If a player has no valid moves, their turn is skipped
6. The game ends when neither player can make a valid move
7. The player with the most pieces wins

### Strategy Tips
- **Corners are valuable** - Pieces in corners cannot be flipped
- **Edges are strong** - Edge pieces are harder to flip
- **Avoid cells next to corners** - These can give your opponent corner access
- **Mobility matters** - Having more move options is advantageous

## TypeScript Migration

This project was recently migrated from JavaScript to TypeScript with:
- ✅ Strict type checking enabled
- ✅ Comprehensive type definitions for all game logic
- ✅ Full type coverage across components and hooks
- ✅ Zero compilation errors
- ✅ All tests passing

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is open source and available for educational purposes.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## Acknowledgments

- Game logic based on classic Othello/Reversi rules
- Built with modern React best practices
- Fully typed with TypeScript for maintainability
