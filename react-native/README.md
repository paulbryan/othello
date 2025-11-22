# Othello - React Native

A mobile implementation of the classic Othello (Reversi) board game built with React Native and Expo.

## Features

- 🎮 **Two Game Modes**
  - Player vs Player (PvP)
  - Player vs Computer (PvC) with AI opponent
- 🎨 **Customizable Colors** - Change board and piece colors
- 🌓 **Dark Mode Support** - Toggle between light and dark themes
- 🏆 **Leaderboard** - Track game history and results
- 🎉 **Victory Animations** - Confetti celebration for wins
- 💾 **Persistent Storage** - Settings and game history saved locally

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo Go app (for testing on physical devices)
- iOS Simulator or Android Emulator (optional)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on a device or simulator:
   - **iOS Simulator**: Press `i` in the terminal
   - **Android Emulator**: Press `a` in the terminal
   - **Physical Device**: Scan the QR code with Expo Go app

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run in web browser
- `npm test` - Run unit tests

## Testing

The project includes unit tests for game logic:

```bash
npm test
```

**Test Coverage:**
- Board creation and initialization
- Valid move detection
- Score calculation
- Piece flip logic

All tests use Jest and are configured to work with React 19 and Expo.

## Project Structure

```
react-native/
├── src/
│   ├── components/     # UI components (Board, Cell, GameOver, etc.)
│   ├── hooks/          # Custom hooks (useOthello, useAsyncStorage)
│   ├── utils/          # Game logic and constants
│   ├── types/          # TypeScript type definitions
│   ├── theme.ts        # Theme configuration
│   └── App.tsx         # Main application component
├── assets/             # Images and static resources
├── App.js              # Entry point wrapper
├── index.js            # Root entry point
└── package.json        # Dependencies and scripts
```

## Technologies

- **React Native** 0.81.5
- **Expo** ~54.0.25
- **React** 19.1.0
- **TypeScript** - Type safety
- **AsyncStorage** - Local data persistence
- **Jest** - Unit testing

## Game Rules

Othello is played on an 8×8 board with black and white pieces:

1. Players take turns placing pieces on the board
2. A valid move must flip at least one opponent's piece
3. Pieces are flipped when sandwiched between the new piece and another piece of the same color
4. The game ends when no valid moves remain
5. The player with the most pieces wins

## Customization

### Colors
Tap the 🎨 Colors button to customize:
- Board background color
- Black piece color
- White piece color

### Theme
Toggle between light and dark mode using the theme button in the header.

## Building and Deployment

This project uses **EAS (Expo Application Services)** for building and deploying to app stores.

### Prerequisites for Building

- Expo account (sign up at [expo.dev](https://expo.dev))
- For iOS builds: Apple Developer account ($99/year)
- For Android builds: Google Play Console account ($25 one-time)

### Setup EAS CLI

Install EAS CLI globally (first time only):

```bash
npm install -g eas-cli
```

Login to your Expo account:

```bash
eas login
```

### Development Builds

Create development builds for testing on physical devices:

```bash
# Build for Android (APK for testing)
eas build --platform android --profile preview

# Build for iOS (requires Apple Developer account)
eas build --platform ios --profile preview
```

Development builds allow you to test the app on real devices without publishing to app stores.

### Production Builds

Build optimized versions for app store submission:

```bash
# Build for Google Play Store
eas build --platform android --profile production

# Build for Apple App Store
eas build --platform ios --profile production

# Build for both platforms simultaneously
eas build --platform all --profile production
```

### Submitting to App Stores

After building, submit directly to app stores:

```bash
# Submit to Google Play Store
eas submit --platform android

# Submit to Apple App Store
eas submit --platform ios
```

### Over-the-Air (OTA) Updates

Push JavaScript-only updates without rebuilding the entire app:

```bash
# Push update to production branch
eas update --branch production --message "Bug fixes and improvements"

# Push update to preview branch
eas update --branch preview --message "Testing new features"
```

**Note**: OTA updates only work for JavaScript code changes. Native code changes (dependencies, native modules) require a full rebuild.

### Build Profiles

The project includes three build profiles (configured in `eas.json`):

- **development**: For local development and testing
- **preview**: For internal testing and QA
- **production**: For app store releases

## License

MIT

## Author

Paul Bryan
