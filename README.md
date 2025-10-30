# Othello Game

A fully-featured web-based Othello (Reversi) game with multiplayer and AI opponent.

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

## Othello Rules

- Players alternate placing discs on the board
- A valid move must flip at least one opponent's disc
- Discs are flipped when sandwiched between the new disc and another disc of the same color
- The player with the most discs when the game ends wins

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
