import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const PokemonCards = ({ pokemon, index }) => {
  return (
    <div
      key={index}
      className="p-4 bg-white border border-gray-200 rounded-lg shadow"
    >
      <div className="mb-4">
        <div className="text-gray-600">{index}</div>
      </div>
      <div className="mb-4">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            index + 1
          }.png`}
          alt={pokemon.name}
          className="w-full h-auto object-contain"
        />
      </div>
      <div>
        <p className="text-gray-700 text-xl font-bold mb-2 capitalize text-center">
          {pokemon.name}
        </p>
        <Link to={`/pokemon/${pokemon.name}`} className="btn btn-active btn-neutral w-full">
          Detail
        </Link>
      </div>
    </div>
  );
};

PokemonCards.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    // Add other required properties if available
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default PokemonCards;
