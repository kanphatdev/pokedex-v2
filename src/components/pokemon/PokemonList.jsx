import axios from "axios";
import { useState, useEffect } from "react";

const PokemonList = () => {
  const [poke, setPoke] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let abortController = new AbortController();

    const loadPoke = async () => {
      try {
        setLoading(true);
        let response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`,
          {
            signal: abortController.signal,
          }
        );

        setPoke(response.data.results); // Assuming 'results' is the key that holds the array of Pokemon
        setError("");
      } catch (err) {
        setError(
          <>
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{err.message}</span>
            </div>
          </>
        );
      } finally {
        setLoading(false);
      }
    };

    loadPoke();
    return () => abortController.abort();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {loading && <p>Loading...</p>}
      {error && <div>{error}</div>}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {poke.map((pokemon, index) => (
            <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg shadow">
              <div className="mb-4">

                <div className="text-gray-600">
                  {index}
                </div>
              </div>
              <div className="mb-4">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
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
          ))}
        </div>
      )}
    </div>
  );
};

export default PokemonList;
