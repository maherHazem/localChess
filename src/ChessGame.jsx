import {Chessboard} from "react-chessboard";
import {Chess} from "chess.js";
import {useRef, useState} from "react";

const ChessGame = () => {
  // create a chess game using a ref to always have access to the latest game state within closures and maintain the game state across renders
  const chessGameRef = useRef(new Chess());
  const chessGame = chessGameRef.current;
  // use state to trigger re-renders when the chess position changes, initializing it with the current position of the chess game in FEN notation
  const [chessPosition, setChessPosition] = useState(chessGame.fen());
  const [moveFrom, setMoveFrom] = useState('');
  const [optionSquares, setOptionSquares] = useState({});
  // function to get the current game status, checking for game over conditions and whose turn it is
  const getGameStatus = () => {
    if (chessGame.isGameOver()) {
      if (chessGame.isCheckmate()) return "Checkmate!";
      if (chessGame.isDraw()) return "Draw!";
      if (chessGame.isStalemate()) return "Stalemate!";
      return "Game Over!";
    }
    if (chessGame.isCheck()) return "Check!";

    return `${chessGame.turn() === 'w' ? "White" : "Black"} to move`;
  }

  

  function getMoveOptions(square) {
    // get the moves for the square
    const moves = chessGame.moves({
      square,
      verbose: true
    });

    // if no moves, clear the option squares
    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }

    // create a new object to store the option squares
    const newSquares = {};

    // loop through the moves and set the option squares
    for (const move of moves) {
      newSquares[move.to] = {
        background: chessGame.get(move.to) && chessGame.get(move.to)?.color !== chessGame.get(square)?.color ? 'radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)' // larger circle for capturing
        : 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)',
        // smaller circle for moving
        borderRadius: '50%'
      };
    }

    // set the square clicked to move from to yellow
    newSquares[square] = {
      background: 'rgba(255, 255, 0, 0.4)'
    };

    // set the option squares
    setOptionSquares(newSquares);

    // return true to indicate that there are move options
    return true;
  }
  function newGame() {
      setChessPosition(chessGame.reset());
  }
  function onSquareClick({
    square,
    piece
  }) {
    // piece clicked to move
    if (!moveFrom && piece) {
      // get the move options for the square
      const hasMoveOptions = getMoveOptions(square);

      // if move options, set the moveFrom to the square
      if (hasMoveOptions) {
        setMoveFrom(square);
      }

      // return early
      return;
    }

    // square clicked to move to, check if valid move
    const moves = chessGame.moves({
      square: moveFrom,
      verbose: true
    });
    const foundMove = moves.find(m => m.from === moveFrom && m.to === square);

    // not a valid move
    if (!foundMove) {
      // check if clicked on new piece
      const hasMoveOptions = getMoveOptions(square);

      // if new piece, setMoveFrom, otherwise clear moveFrom
      setMoveFrom(hasMoveOptions ? square : '');

      // return early
      return;
    }

    // is normal move
    try {
      chessGame.move({
        from: moveFrom,
        to: square,
        promotion: 'q'
      });
    } catch {
      // if invalid, setMoveFrom and getMoveOptions
      const hasMoveOptions = getMoveOptions(square);

      // if new piece, setMoveFrom, otherwise clear moveFrom
      if (hasMoveOptions) {
        setMoveFrom(square);
      }

      // return early
      return;
    }

    // update the position state
    setChessPosition(chessGame.fen());

    // clear moveFrom and optionSquares
    setMoveFrom('');
    setOptionSquares({});
  }

  // handle piece drop
  function onPieceDrop({
    sourceSquare,
    targetSquare
  }) {
    // type narrow targetSquare potentially being null (e.g. if dropped off board)
    if (!targetSquare) {
      return false;
    }

    // try to make the move according to chess.js logic
    try {
      chessGame.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q' // always promote to a queen for example simplicity
      });

      // update the position state upon successful move to trigger a re-render of the chessboard
      setChessPosition(chessGame.fen());

      // return true as the move was successful
      return true;
    } catch {
      // return false as the move was not successful
      return false;
    }
  }

  const turn = chessGame.turn();
  // define chessboard options for both white and black orientations, sharing the same position and onPieceDrop handler but differing in board orientation based on whose turn it is
  const whiteChessboardOptions = {
      position: chessPosition,
      onPieceDrop,
      onSquareClick,
      squareStyles: optionSquares,
      id: "chessboard"
  }
  const blackChessboardOptions = {
      position: chessPosition,
      onPieceDrop,
      onSquareClick,
      squareStyles: optionSquares,
      id: "chessboard",
      boardOrientation: "black"
  }
  return (
      <div id="chessGameContainer">
          <div id="chessGame">
            <h2 id="gameStatus">{getGameStatus()}</h2>
              <div>
              {
                  // conditionally render the chessboard with the appropriate orientation based on whose turn it is
              turn === 'w' ?
              <>
              {<Chessboard options={whiteChessboardOptions} />} 
              </>
              :
              <>
              {<Chessboard options={blackChessboardOptions} />} 
              </>    
              }
              </div> 
              <div>
                  <button onClick={newGame} id="resetGame">New Game</button>
              </div>
          </div>
          <div id="chessNotation">
              <h2>Move History</h2>
              {
                  chessGame.history().length === 0 ?
                  <>
                  {<p>No moves yet</p>}
                  </>
                  :
                  <>
                  {chessGame.history().map((move, index) => (
                      <p key={index}>{index + 1}. {move}</p>
                  ))}
                  </>
              }
          </div>
      </div>
  )
}
export default ChessGame