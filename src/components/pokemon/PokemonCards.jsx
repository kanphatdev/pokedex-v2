

const PokemonCards = ({ pokemon,index }) => {
  return (
<div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
    <img src={pokemon?.sprites?.other?.home?.front_default } />
    </a>
    <div className="p-5">
        <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {pokemon.name}
            </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
           {pokemon.id}
        </p>
      
    </div>
</div>


  )
}

export default PokemonCards