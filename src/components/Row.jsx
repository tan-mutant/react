import Tile from './Tile';

const Row = ({ guess, status }) => {
  return (
    <div className="row">
      {[...Array(5)].map((_, i) => (
        <Tile
          key={i}
          letter={guess[i] || ''}
          status={status?.[i]}
        />
      ))}
    </div>
  );
};

export default Row; 