import Row from './Row';

const Board = ({ guesses, statuses }) => {
  return (
    <div className="board">
      {[...Array(6)].map((_, i) => (
        <Row
          key={i}
          guess={guesses[i] || ''}
          status={statuses[i]}
        />
      ))}
    </div>
  );
};

export default Board; 