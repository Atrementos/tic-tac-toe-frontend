import { useState } from "react";

import Player from "../src/components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [turns, updateTurns] = useState([]);

  function deriveActivePlayer(turns) {
    let curPlayer = 'X';
    if (turns.length > 0 && turns[0].player === 'X') {
      curPlayer = 'O';
    }
    return curPlayer;
  }

  function handleSquareSelect(rowIndex, colIndex) {
    updateTurns((prevTurns) => {
      const curPlayer = deriveActivePlayer(prevTurns);
      let updatedTurns = [{ cell: { row: rowIndex, col: colIndex }, player: curPlayer }, ...prevTurns];
      return updatedTurns;
    })
  }

  function deriveGameBoard(turns) {
    const boardCopy = [...initialBoard.map((array) => [...array])];

    for (const turn of turns) {
      const { cell, player } = turn;
      const { row, col } = cell;
      boardCopy[row][col] = player;
    }

    return boardCopy;
  }

  function deriveWinner(gameBoard) {
    let winner = undefined;

    for (const winComb of WINNING_COMBINATIONS) {
      const symbol0 = gameBoard[winComb[0].row][winComb[0].column];
      const symbol1 = gameBoard[winComb[1].row][winComb[1].column];
      const symbol2 = gameBoard[winComb[2].row][winComb[2].column];

      if (symbol0 === symbol1 && symbol1 === symbol2) {
        return symbol0;
      }
    }

    return winner;
  }

  function onRematch() {
    updateTurns(() => {
      return [];
    })
  }

  const activePlayer = deriveActivePlayer(turns);
  const gameBoard = deriveGameBoard(turns);
  const winner = deriveWinner(gameBoard);
  const isDraw = turns.length === 9 && winner === undefined;

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === 'X'}></Player>
          <Player name="Player 2" symbol="O" isActive={activePlayer === 'O'}></Player>
        </ol>
        <GameBoard handleSquareSelect={handleSquareSelect} gameBoard={gameBoard}></GameBoard>
        {(winner || isDraw) && <GameOver winner={winner} onRematch={onRematch} />}
      </div>
      <Log turnsLog={turns}></Log>
    </main>
  );
}

export default App;
