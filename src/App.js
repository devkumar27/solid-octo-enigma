import { useState } from "react";

function Square({ value, onSqClick }) {
  return (
    <button className="square" onClick={onSqClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }
  const winner = calculateWinner(squares);
  let status = "";
  if (winner) {
    status = "Winner is: " + winner;
  } else {
    status = "Next is: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSqClick={() => handleClick(0)} />
        <Square value={squares[1]} onSqClick={() => handleClick(1)} />
        <Square value={squares[2]} onSqClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSqClick={() => handleClick(3)} />
        <Square value={squares[4]} onSqClick={() => handleClick(4)} />
        <Square value={squares[5]} onSqClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSqClick={() => handleClick(6)} />
        <Square value={squares[7]} onSqClick={() => handleClick(7)} />
        <Square value={squares[8]} onSqClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSqs = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let desc = "";
    if (move > 0) {
      desc = "Next move is #" + move;
    } else {
      desc = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSqs} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
