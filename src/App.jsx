import { useState } from 'react';
import './App.css';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  if (!squares.includes(null)) {
    return { winner: 'Draw', line: null };
  }
  return { winner: null, line: null };
}

function Square({ value, onSquareClick, highlight }) {
  return (
    <button
      className={`square ${highlight ? 'highlight' : ''}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  const { winner, line } = calculateWinner(squares);

  function handleClick(i) {
    if (winner || squares[i]) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  let status;
  if (winner === 'Draw') {
    status = 'Game Drawn';
  } else if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      {Array(3).fill(null).map((_, row) => (
        <div className="board-row" key={row}>
          {Array(3).fill(null).map((_, col) => {
            const i = row * 3 + col;
            const isWinningSquare = line && line.includes(i);
            return (
              <Square
                key={i}
                value={squares[i]}
                onSquareClick={() => handleClick(i)}
                highlight={isWinningSquare}
              />
            );
          })}
        </div>
      ))}
    </>
  );
}

export default function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const { winner } = calculateWinner(squares);

  function handlePlay(nextSquares) {
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={squares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        {(winner || winner === 'Draw') && (
          <button onClick={resetGame}>Start New Game</button>
        )}
      </div>
    </div>
  );
}
