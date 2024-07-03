import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI_State/Skeleton";
import { Trash2 } from "lucide-react";

const Pocket = () => {
  const [poke, setPoke] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let abortController = new AbortController();

    const loadPoke = async () => {
      try {
        setLoading(true);

        // Fetch stored Pokémon from localStorage
        const storedPocket = JSON.parse(localStorage.getItem("pocket")) || [];

        // Fetch details for each Pokémon in the storedPocket
        const pokemonDetails = await Promise.all(
          storedPocket.map(async (pokemon) => {
            const details = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
            return {
              ...pokemon,
              id: details.data.id,
              types: details.data.types.map((typeInfo) => typeInfo.type.name),
              abilities: details.data.abilities.map((abilityInfo) => abilityInfo.ability.name),
              sprite: details.data.sprites.front_default,
            };
          })
        );

        setPoke(pokemonDetails);
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

  // Function to handle removing Pokémon from pocket
  const removeFromPocket = (pokemonName) => {
    const updatedPocket = poke.filter((pokemon) => pokemon.name !== pokemonName);
    setPoke(updatedPocket);
    localStorage.setItem("pocket", JSON.stringify(updatedPocket));
  };

  // Function to determine CSS class based on Pokemon type
  const getTypeClass = (type) => {
    switch (type.toLowerCase()) {
      // Type color cases
    }
  };

  if (loading) {
    return <div><Skeleton/></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold capitalize mb-4">Pokémon List</h1>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {poke.map((pokemon, index) => (
          <Link to={`/pokemon/${pokemon.name}`} key={index}>
            <div className="flex items-center  justify-between p-4 border rounded-lg hover:shadow-lg transition">
              <div className="">
                <img
                  src={pokemon.sprite}
                  alt={pokemon.name}
                  className="w-16 h-16 mr-4"
                />
                <div>
                  <h2 className="text-xl font-semibold capitalize">
                    {pokemon.name}
                  </h2>
                  <div className="flex space-x-2">
                    {pokemon.types.map((type, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 rounded-full text-sm text-white ${getTypeClass(type)}`}
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    Abilities: {pokemon.abilities.join(", ")}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className=" p-4 ">
                  <h2 className="text-xl font-bold mb-2">Quantity</h2>
                  <p className="">{pokemon.quantity}</p>
                </div>
                <div className=" p-4 ">
                  <button className="btn btn-ghost" onClick={() => removeFromPocket(pokemon.name)}>
                    <Trash2 />
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Pocket;
