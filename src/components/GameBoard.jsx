export default function GameBoard({ handleSquareSelect, gameBoard }) {
  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((cellSymbol, cellIndex) => (
              <li key={cellIndex}>
                <button onClick={() => handleSquareSelect(rowIndex, cellIndex)} disabled={cellSymbol !== null}>{cellSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
