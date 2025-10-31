# Othello Game

A fully-featured web-based Othello (Reversi) game with multiplayer and AI opponent.

## Screenshots

### Initial Game State
![Initial Game](https://github.com/user-attachments/assets/2ddd2748-1517-4964-891a-b6a7ead7466f)

### Active Gameplay
![Gameplay](https://github.com/user-attachments/assets/07655c3b-0e03-4d17-8cbb-7396fc99a2c3)

### Dark Mode
![Dark Mode](https://github.com/user-attachments/assets/3216fde7-894e-4435-8a3d-d1adecae554d)

## Features

### Game Modes
- **Player vs Player**: Play locally with another person
- **Player vs Computer**: Challenge an AI opponent with strategic gameplay

### Customization
- **Light/Dark Mode**: Toggle between light and dark themes
- **Color Customization**: Personalize board and piece colors
- **Persistent Settings**: Your theme and color preferences are saved

### Gameplay
- Standard 8×8 Othello rules
- Valid move highlighting
- Real-time score tracking
- Automatic disc flipping
- Game over detection with winner announcement

### AI Features
- Strategic corner and edge prioritization
- Avoids risky positions near empty corners
- Maximizes disc captures

## How to Play

1. Open `index.html` in a web browser
2. Select your game mode (Player vs Player or Player vs Computer)
3. Click "New Game" to start
4. Click on highlighted cells to make valid moves
5. The game ends when no valid moves remain

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

#### Valid Move Examples
- **Horizontal capture**: Place a disc that creates a line like `Black-White-White-Black` (the two white discs in the middle get flipped to black)
- **Vertical capture**: Same concept but in a vertical line
- **Diagonal capture**: Same concept but along a diagonal
- **Multiple directions**: A single move can capture discs in multiple directions simultaneously

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

## Technologies Used

- HTML5
- CSS3 (with CSS Variables for theming)
- Vanilla JavaScript (no frameworks required)

## Running the Game

Simply open `index.html` in any modern web browser. No build process or server required.

For local development with live reload, you can use:
```bash
python3 -m http.server 8000
```

Then navigate to `http://localhost:8000`
