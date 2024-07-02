import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI_State/Skeleton";
import { Grid2X2, Rows2 } from "lucide-react";

const PokemonList = () => {
  const [poke, setPoke] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeView, setActiveView] = useState("list"); // State to manage active view

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

        const pokemonDetails = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const details = await axios.get(pokemon.url);
            return {
              name: pokemon.name,
              id: details.data.id,
              types: details.data.types.map((typeInfo) => typeInfo.type.name),
              abilities: details.data.abilities.map(
                (abilityInfo) => abilityInfo.ability.name
              ),
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

  // Function to handle view change
  const handleViewChange = (view) => {
    setActiveView(view);
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
        <div className="join py-4">
          <Link to={"/pokemonlist"}>
            <button
              className={`btn join-item ${activeView === "list" ? "active" : ""}`}
              onClick={() => handleViewChange("list")}
            >
              <Rows2 /> List View
            </button>
          </Link>

          <Link to={"/"}>
            <button
              className={`btn join-item ${activeView === "grid" ? "active" : ""}`}
              onClick={() => handleViewChange("grid")}
            >
              <Grid2X2 /> Grid View
            </button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {poke.map((pokemon, index) => (
          <Link to={`/pokemon/${pokemon.name}`} key={index}>
            <div className="flex items-center p-4 border rounded-lg hover:shadow-lg transition">
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
          </Link>
        ))}
      </div>
    </div>
  );
};

// Function to determine CSS class based on Pokemon type
const getTypeClass = (type) => {
  switch (type.toLowerCase()) {
    case "normal":
      return "bg-gray-400 text-gray-800";
    case "fire":
      return "bg-red-500 text-white";
    case "water":
      return "bg-blue-500 text-white";
    case "grass":
      return "bg-green-500 text-white";
    case "electric":
      return "bg-yellow-400 text-gray-800";
    case "ice":
      return "bg-blue-200 text-white";
    case "fighting":
      return "bg-red-800 text-white";
    case "poison":
      return "bg-purple-500 text-white";
    case "ground":
      return "bg-yellow-800 text-white";
    case "flying":
      return "bg-indigo-400 text-white";
    case "psychic":
      return "bg-purple-800 text-white";
    case "bug":
      return "bg-green-700 text-white";
    case "rock":
      return "bg-gray-800 text-white";
    case "ghost":
      return "bg-indigo-800 text-white";
    case "dragon":
      return "bg-red-900 text-white";
    case "dark":
      return "bg-gray-900 text-white";
    case "steel":
      return "bg-gray-500 text-white";
    case "fairy":
      return "bg-pink-300 text-gray-800";
    default:
      return "bg-gray-400 text-gray-800";
  }
};

export default PokemonList;
