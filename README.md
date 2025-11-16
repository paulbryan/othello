# Othello Game

A fully-featured web-based Othello (Reversi) game built with React and Vite, featuring multiplayer and AI opponent.

## Screenshots

### Initial Game State
![Initial Game](https://github.com/user-attachments/assets/37abcd66-f4ad-4d95-aa9d-d37316d1117a)

### Dark Mode
![Dark Mode](https://github.com/user-attachments/assets/cd13627e-292f-4573-bad9-e378f121e137)

## Features

### Game Modes
- **Player vs Player**: Play locally with another person
- **Player vs Computer**: Challenge an AI opponent with strategic gameplay

### Customization
- **Light/Dark Mode**: Toggle between light and dark themes
- **Color Customization**: Personalize board and piece colors
- **Persistent Settings**: Your theme and color preferences are saved
- **Game History**: Track your past games with a leaderboard

### Gameplay
- Standard 8×8 Othello rules
- Valid move highlighting
- Real-time score tracking
- Automatic disc flipping
- Game over detection with winner announcement
- Celebratory confetti animation when you win against the computer

### AI Features
- Strategic corner and edge prioritization
- Avoids risky positions near empty corners
- Maximizes disc captures

## Technologies Used

- React 19
- Vite 7
- CSS3 (with CSS Variables for theming)
- Modern JavaScript (ES6+)

## Getting Started

### Prerequisites
- Node.js (v20 or higher)
- npm (v10 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/paulbryan/othello.git
cd othello
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To create a production build:
```bash
npm run build
```

The build output will be in the `dist` directory.

### Preview Production Build

To preview the production build locally:
```bash
npm run preview
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## How to Play

1. Select your game mode (Player vs Player or Player vs Computer)
2. Click "New Game" to start
3. Click on highlighted cells to make valid moves
4. The game ends when no valid moves remain

## Detailed Game Rules

### Objective
The goal of Othello is to have the majority of your colored discs on the board when the game ends.

### Game Setup
- The game is played on an 8×8 board
- The game starts with four discs placed in the center of the board in a diagonal pattern:
  - Two black discs and two white discs
  - Black discs are placed at positions (3,4) and (4,3)
  - White discs are placed at positions (3,3) and (4,4)
- Black always moves first

### How to Play

#### Making a Move
1. **Valid Moves**: A move is valid only if it "captures" at least one opponent's disc
2. **Capturing**: To capture opponent discs, you must place your disc so that one or more opponent discs are sandwiched in a straight line (horizontally, vertically, or diagonally) between your newly placed disc and another disc of your color
3. **Immediate Flipping**: All captured discs are immediately flipped to your color

#### Turn Progression
1. Players alternate turns, with Black moving first
2. On your turn, you must make a move if you have any valid moves available
3. Valid moves are highlighted in yellow/gold on the board
4. Click on any highlighted cell to place your disc and capture opponent discs
5. If you have no valid moves, your turn is skipped and play passes to your opponent
6. If both players have no valid moves, the game ends

### Winning the Game

The game ends when:
- The board is completely filled with discs, OR
- Neither player has any valid moves available

The winner is determined by counting the discs:
- **Winner**: The player with the most discs of their color on the board
- **Tie**: If both players have the same number of discs
- The score is continuously displayed during the game

### Strategy Tips

#### Corner Advantage
- **Corners are critical**: Discs placed in corners cannot be flipped and provide a strong strategic advantage
- Try to capture corners when possible
- Avoid giving your opponent opportunities to capture corners

#### Edge Control
- **Edges are valuable**: Discs on edges are harder to flip than those in the center
- Control of edges often leads to control of corners

#### Mobility
- **Maintain options**: Try to keep multiple valid moves available
- Limiting your opponent's options can force them to make unfavorable moves

#### X-Squares (C-Squares)
- **Avoid X-squares early**: The squares diagonally adjacent to corners (X-squares or C-squares) are risky early in the game
- Playing these squares often gives your opponent access to the corner

#### Disc Count Misconception
- **More isn't always better**: Having more discs in the early/mid game isn't necessarily advantageous
- Focus on position and mobility rather than just disc count
- The final count is what matters

