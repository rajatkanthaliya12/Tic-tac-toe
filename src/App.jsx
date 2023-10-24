import "./styles.css";

import React, { useState, useEffect } from "react";

const App = () => {
  const [boardSize, setBoardSize] = useState(3);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [board, setBoard] = useState(
    Array(boardSize)
      .fill(null)
      .map(() => Array(boardSize).fill(null))
  );
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    reset(boardSize);
  }, [boardSize]);

  const handleClick = (row, col) => {
    if (!board[row][col] && !winner) {
      const newBoard = board.map((row) => [...row]);
      newBoard[row][col] = currentPlayer;
      setBoard(newBoard);
      checkWinner(row, col, newBoard);
      togglePlayer();
    }
  };

  const reset = (boardSize = 3) => {
    setBoard(
      Array(boardSize)
        .fill(null)
        .map(() => Array(boardSize).fill(null))
    );
    setCurrentPlayer("X");
    setWinner(null);
    setBoardSize(boardSize);
  };

  const togglePlayer = () => {
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const checkWinner = (row, col, newBoard) => {
    const currentPlayer = newBoard[row][col];

    const checkLine = (line) => line.every((cell) => cell === currentPlayer);

    const checkRow = newBoard[row];
    const checkColumn = Array(boardSize)
      .fill(null)
      .map((_, i) => newBoard[i][col]);

    const mainDiagonal =
      row === col
        ? Array(boardSize)
            .fill(null)
            .map((_, i) => newBoard[i][i])
        : [];
    const antiDiagonal =
      row + col === boardSize - 1
        ? Array(boardSize)
            .fill(null)
            .map((_, i) => newBoard[i][boardSize - 1 - i])
        : [];

    if (
      checkLine(checkRow) ||
      checkLine(checkColumn) ||
      (mainDiagonal.length > 0 && checkLine(mainDiagonal)) ||
      (antiDiagonal.length > 0 && checkLine(antiDiagonal))
    ) {
      setWinner(currentPlayer);
    }
  };

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>

      <label>
        Board Size:
        <input
          type="number"
          value={boardSize}
          onChange={(e) => setBoardSize(Number(e.target.value))}
        />
      </label>

      {winner ? (
        <h2>Winner: {winner}</h2>
      ) : (
        <h2>Current Player: {currentPlayer}</h2>
      )}
      <div className={winner ? "win-board board" : "board"}>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className="cell"
                onClick={() => handleClick(rowIndex, colIndex)}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button className="reset" onClick={() => reset()}>
        Reset
      </button>
    </div>
  );
};

export default App;
