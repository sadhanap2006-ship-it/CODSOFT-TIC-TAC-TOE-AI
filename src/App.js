import { useState } from "react";
import Board from "./components/Board";
import { checkWinner, getBestMove } from "./ai/minimax";
import "./App.css";

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = "X";

    let result = checkWinner(newBoard);
    if (result) {
      setBoard(newBoard);
      setWinner(result);
      return;
    }

    const aiMove = getBestMove(newBoard);
    newBoard[aiMove] = "O";

    result = checkWinner(newBoard);

    setBoard(newBoard);
    if (result) setWinner(result);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
  };

  return (
    <div className="app">
      <h1>Tic Tac Toe AI</h1>
      <Board board={board} onClick={handleClick} />
      <h2>
        {winner
          ? winner === "draw"
            ? "It's a Draw!"
            : `${winner} Wins!`
          : "Your turn"}
      </h2>
      <button onClick={resetGame}>Restart</button>
    </div>
  );
}
