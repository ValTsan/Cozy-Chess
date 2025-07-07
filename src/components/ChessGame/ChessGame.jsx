import { Chess } from "chess.js";
import { useState } from "react";

import "../ChessGame/ChessGame.css";

const ChessGame = () => {
  const [game, setGame] = useState(new Chess());
  return <div></div>;
};

export default ChessGame;
