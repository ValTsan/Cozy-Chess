import { BLACK, Chess } from "chess.js";
import { useState } from "react";
import { Chessboard } from "react-chessboard";
import "../ChessGame/ChessGame.css";

const ChessGame = () => {
  const [game, setGame] = useState(new Chess());
  const [moveLog, setMoveLog] = useState([]);

  const getGameStatus = () => {
    if (game.isCheckmate()) {
      return `Checkmate - ${game.turn() === "w" ? "Black" : "White"} wins!`;
    }

    if (game.isDraw()) return "Draw!";
    if (game.isStalemate()) return "Stalemate!";
    if (game.isThreefoldRepetition()) return "Draw by repetition!";
    if (game.isInsufficientMaterial()) return "Draw - insufficient material.";

    if (game.isCheck()) {
      return `${game.turn() === "w" ? "White" : "Black"} is in check.`;
    }
    return `${game.turn() === "w" ? "White" : "Black"} to move.`;
  };

  const makeMove = (move) => {
    const gameCopy = new Chess(game.fen());
    const result = gameCopy.move(move);
    if (result) {
      setGame(gameCopy);
      setMoveLog([...moveLog, result]);
    }
  };

  const onDrop = (sourceSquare, targetSquare) => {
    return makeMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });
  };

  const getSquareStyles = () => {
    const styles = {};
    const light = "#e8edf9";
    const dark = "#b7c0d7";

    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

    for (let r = 1; r <= 8; r++) {
      for (let f = 0; f < 8; f++) {
        const square = files[f] + r;
        const isLight = (r + f) % 2 === 0;
        styles[square] = {
          backgroundColor: isLight ? light : dark,
        };
      }
    }

    return styles;
  };

  return (
    <div className="chessgame">
      <div className="chessgame__container">
        <div className="chessgame__status">{getGameStatus()}</div>
        <Chessboard
          position={game.fen()}
          onPieceDrop={onDrop}
          boardWidth={560}
          boardOrientation="white"
          customBoardStyle={{
            borderRadius: "4px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          }}
          // customSquareStyles={getSquareStyles()}
          // customDarkSquareStyle={{ backgroundColor: "#b7c0d7" }}
          // customLightSquareStyle={{ backgroundColor: "#e8edf9" }}
        />
      </div>
    </div>
  );
};

export default ChessGame;
