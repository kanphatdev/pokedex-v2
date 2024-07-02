import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PokemonCards from "./PokemonCards";
import Skeleton from "../UI_State/Skeleton";
import { Grid2X2, Rows2 } from "lucide-react";

const PokemonGrid = () => {
  const [poke, setPoke] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [view, setView] = useState("grid"); // State to manage view

  const navigate = useNavigate();

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

        setPoke(response.data.results);
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

  const handleViewChange = (view) => {
    setView(view);
    if (view === "rows") {
      navigate("/pokemonlist");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex gap-4 justify-between items-center">
        <div className="">
          <h1 className="text-2xl font-bold capitalize">Pokémon grid </h1>
        </div>
        <div className="">
          <div className="join">
            <button className="btn join-item" onClick={() => handleViewChange("rows")}>
              <Rows2 />
            </button>
            <button className="btn join-item" onClick={() => handleViewChange("grid")}>
              <Grid2X2 />
            </button>
          </div>
        </div>
      </div>
      {loading && <Skeleton />}
      {error && <div>{error}</div>}
      {!loading && !error && (
        <div className={`grid ${view === "grid" ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" : "grid-cols-1"} gap-4 py-4`}>
          {poke.map((pokemon, index) => (
            <Link to={`/pokemon/${pokemon.name}`} key={pokemon.name}>
              <PokemonCards index={index + 1} pokemon={pokemon} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default PokemonGrid;
