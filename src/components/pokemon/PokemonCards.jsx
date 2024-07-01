import PropTypes from 'prop-types'; 
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
        {/* Add other Pokemon details here if available */}
        <p className="text-gray-700 text-xl font-bold mb-2 capitalize text-center">
          {pokemon.name}
        </p>
      </div>
    </div>
  );
};

export default PokemonCards;
PokemonCards.propTypes ={
  pokemon:PropTypes.string,
  index:PropTypes.any
}