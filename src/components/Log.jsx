export default function Log({ turnsLog }) {
    return (<ol id="log">
        {turnsLog.map((turn, turnIndex) => {
            const { cell, player } = turn;
            const { row, col } = cell;
            return (<li key={turnIndex}>{`${player} placed on [${row}, ${col}]`}</li>);
        })}
    </ol>);
}