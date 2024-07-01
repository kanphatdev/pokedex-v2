import axios from "axios";
import { useState, useEffect } from "react";
import PokemonCards from "./PokemonCards";
import Skeleton from "../UI_State/Skeleton";

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
          `https://pokeapi.co/api/v2/pokemon?limit=1024&offset=0`,
          {
            signal: abortController.signal,
          }
        );

        setPoke(response.data.results); // Assuming 'results' is the key that holds the array of Pokemon
        setError("");
      } catch (err) {
        setError(
          <>
            <Skeleton />
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
      {loading && <Skeleton />}
      {error && <div>{error}</div>}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {poke.map((pokemon, index) => (
            <PokemonCards index={index} pokemon={pokemon} key={pokemon.name} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PokemonList;
