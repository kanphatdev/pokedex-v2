import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, User, ShoppingBag } from "lucide-react";

const Navbar = () => {
  const [poke, setPoke] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredPoke, setFilteredPoke] = useState([]);

  useEffect(() => {
    const loadPoke = async () => {
      try {
        let response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=1024&offset=0`
        );

        const pokemonDetails = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const details = await axios.get(pokemon.url);
            return {
              name: pokemon.name,
              id: details.data.id,
            };
          })
        );

        setPoke(pokemonDetails);
      } catch (err) {
        console.error("Failed to load Pokémon data.");
      }
    };

    loadPoke();
  }, []);

  useEffect(() => {
    if (search) {
      setFilteredPoke(
        poke.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredPoke([]);
    }
  }, [search, poke]);

  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
      <div className="flex items-center">
        <Link to="/" className="btn btn-ghost text-xl text-yellow-500">
          Pokémon
        </Link>
      </div>
      <div className="flex items-center flex-grow mx-4 relative">
        <Search className="text-yellow-500 mr-2" />
        <input
          type="text"
          placeholder="Search Pokémon by name..."
          className="flex-grow p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <div className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
            {filteredPoke.length > 0 ? (
              filteredPoke.slice(0, 10).map((pokemon) => (
                <div key={pokemon.id} className="p-2 hover:bg-gray-100">
                  <Link
                    to={`/pokemon/${pokemon.name}`}
                    className="flex justify-between"
                  >
                    <span className="text-gray-700">{pokemon.name}</span>
                    <span className="text-gray-500">#{pokemon.id}</span>
                  </Link>
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500">No Pokémon found</div>
            )}
          </div>
        )}
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <User className="text-yellow-500" />
          <span>Username</span>
        </div>
        <Link to={"/pocketball"}>
          <div className="relative flex items-center">
            <ShoppingBag className="text-yellow-500" />
            <span className="absolute top-0 right-0 bg-neutral-800 text-white text-xs rounded-full px-1">
              0
            </span>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
