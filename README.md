# Othello Game

This repository contains three implementations of the classic Othello (Reversi) game.

## Implementations

### 1. React Native Implementation (`/react-native`) ⭐ NEW
A mobile-first implementation built with React Native and Expo.
- **Features**:
  - Player vs Player and Player vs Computer modes with AI.
  - Native mobile experience for iOS and Android.
  - Dark/Light mode support.
  - Customizable board and piece colors.
  - Leaderboard with AsyncStorage persistence.
  - Victory confetti animations.
  - Unit tested game logic.
- **Tech Stack**: React Native 0.81.5, Expo ~54, React 19, TypeScript, Jest.

### 2. React Web Implementation (`/react`)
A modern, responsive web application built with React and Vite.
- **Features**:
  - Player vs Player and Player vs Computer modes.
  - Mobile-responsive design (optimized for iPhone SE and up).
  - Dark/Light mode.
  - Customizable colors.
  - Leaderboard with local storage persistence.
  - Confetti celebration.
- **Tech Stack**: React, Vite, CSS Modules (Vanilla CSS), Playwright (Testing).

### 3. Legacy Implementation (`/legacy`)
The original vanilla JavaScript implementation.
- **Features**: Basic game logic and UI.
- **Tech Stack**: HTML, CSS, Vanilla JavaScript.

## Getting Started

### React Native Version (Mobile)
1. Navigate to the `react-native` directory:
   ```bash
   cd react-native
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Expo development server:
   ```bash
   npm start
   ```
4. Run on device/simulator:
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app for physical device

### React Web Version
1. Navigate to the `react` directory:
   ```bash
   cd react
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Legacy Version
Simply open `legacy/index.html` in your web browser.

## Testing

- **React Native**: `cd react-native && npm test` - 6 unit tests for game logic
- **React Web**: `cd react && npm test` - Playwright end-to-end tests
