import { Chess } from "chess.js";
import { useState } from "react";
import "../ChessGame/ChessGame.css";

const ChessGame = () => {
  const [game, setGame] = useState(new Chess());
  const [moveLog, setMoveLog] = useState([]);

  return <div></div>;
};

export default ChessGame;
