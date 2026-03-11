# Local Chess Game

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

A fully functional, local two-player chess game built with React, [chess.js](https://github.com/jhlywa/chess.js), and [react-chessboard](https://github.com/Clariity/react-chessboard). Play chess against a friend on the same device with an intuitive interface, move validation, and game history tracking. You can try the game [here](https://dainty-meringue-afeedf.netlify.app/)

## ✨ Features

- **Complete Chess Rules**: Full move validation, check, checkmate, stalemate, and draw detection powered by chess.js
- **Intuitive Interaction**: Click to select pieces, click again to move, or drag and drop pieces
- **Visual Move Indicators**: Colored highlights show selected pieces and possible moves
- **Automatic Board Rotation**: Board automatically rotates to show the current player's perspective
- **Move History**: Complete move list in algebraic notation with scrollable history
- **Responsive Design**: Adapts to different screen sizes with optimized layouts for desktop and mobile
- **New Game Button**: Reset the board and start fresh at any time

## 🎮 How to Play

1. **Starting the Game**: White moves first by default
2. **Making Moves**:
   - **Click-to-Move**: Click a piece to select it (highlights yellow), then click a destination square
   - **Drag-and-Drop**: Drag a piece to its destination square
3. **Visual Feedback**:
   - Selected square: Yellow highlight
   - Possible moves: Dots (empty squares) or circles (capture opportunities)
4. **Game Status**: The header displays whose turn it is, check warnings, or game over conditions
5. **Move History**: All moves are recorded in the right panel with standard algebraic notation
6. **Pawn Promotion**: Automatically promotes to queen for simplicity

## 🛠️ Built With

- [React](https://reactjs.org/) - UI framework
- [chess.js](https://github.com/jhlywa/chess.js) - Chess engine and rules validation
- [react-chessboard](https://github.com/Clariity/react-chessboard) - Chessboard UI component
- Custom CSS - Responsive styling and animations

## 📦 Installation

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Steps

1. Clone the repository:
```bash
git clone https://github.com/maherHazem/localChess.git
cd local-chess-game
```

2. Install dependencies:
```bash
npm install react-chessboard chess.js
# or
yarn add react-chessboard chess.js
```

3. Start the development server:
```bash
npm run start
# or
yarn run start
```

4. Open [http://localhost:3000](http://localhost:3000) to play!

## 🏗️ Project Structure

```
src/
├── App.jsx           # Main application component with header
├── App.css           # Global styles and responsive layouts
├── ChessGame.jsx     # Core chess game logic and UI
└── index.js          # Application entry point
```

## 🧠 Core Components

### ChessGame Component
The heart of the application that manages:
- Game state using React hooks (`useState`, `useRef`)
- Chess logic through chess.js
- Move validation and execution
- Visual feedback system
- Board orientation based on turn

### Key Features Explained

#### Move Validation
- Uses chess.js to validate all moves according to official chess rules
- Handles special moves (castling, en passant, pawn promotion)
- Prevents illegal moves with visual and functional feedback

#### Visual Feedback System
```javascript
// Possible moves shown with gradient circles
- Dots: Empty squares (radial-gradient 25%)
- Circles: Capture opportunities (radial-gradient 85%)
- Yellow highlight: Currently selected piece
```

#### Responsive Breakpoints
- **Mobile**: Stacked layout (< 600px)
- **Tablet Landscape**: Two-column layout with side-by-side board and history
- **Desktop**: Optimized two-column layout with larger elements

## 🎨 Customization

### Modifying Styles
Edit `App.css` to change:
- Color schemes and themes
- Responsive breakpoints
- Component sizing and spacing
- Hover effects and animations

### Changing Promotion Rules
In `ChessGame.jsx`, modify the `promotion` parameter:
```javascript
// Current (always queen)
promotion: 'q'

// Options: 'q' (queen), 'r' (rook), 'b' (bishop), 'n' (knight)
```

## 📱 Responsive Design

The game adapts to various screen sizes:

| Breakpoint | Layout |
|------------|--------|
| < 600px | Stacked (board above history) |
| 600px - 1280px | Two-column with adjusted sizing |
| > 1280px | Expanded two-column with larger elements |

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

### Potential Improvements
- Add difficulty levels vs computer
- Implement game timer
- Save game state to localStorage
- Export/import PGN
- Sound effects
- Dark/light theme toggle

## 📄 License

This project is open source and available under the [MIT License].

## 👤 Author

**Maher Hazem**
- Portfolio: [Visit my portfolio](https://glittering-biscuit-f63091.netlify.app/en/)
- GitHub: [@maherHazem](https://github.com/maherHazem)

## 🙏 Acknowledgments

- [chess.js](https://github.com/jhlywa/chess.js) for the robust chess engine
- [react-chessboard](https://github.com/Clariity/react-chessboard) for the beautiful chessboard component
- The React team for the amazing framework

---

⭐ Star this repo if you find it useful!

[![GitHub stars](https://img.shields.io/github/stars/maherHazem/localChess?style=social)](https://github.com/maherHazem/localChess)
