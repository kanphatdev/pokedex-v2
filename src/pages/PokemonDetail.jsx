import axios from "axios";
import { ArrowLeftFromLine } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Skeleton from "../components/UI_State/Skeleton";

export const PokemonDetail = () => {
  const { name } = useParams(); // Extract the Pokémon name from the URL
  const [poke, setPoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let abortController = new AbortController();

    const loadPoke = async () => {
      try {
        setLoading(true);
        let response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`,
          {
            signal: abortController.signal,
          }
        );

        setPoke(response.data);
        setError("");
      } catch (err) {
        setError(<>
        <Skeleton/>
        </>);
      } finally {
        setLoading(false);
      }
    };

    loadPoke();
    return () => abortController.abort();
  }, [name]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        {poke && (
          <>
            <img
              src={poke.sprites.other["official-artwork"].front_default}
              alt={poke.name}
              className="max-w-sm rounded-lg shadow-2xl"
            />
            <div>
              <h1 className="text-5xl font-bold capitalize">{poke.name}</h1>
              <div className="py-6 px-6 card bg-base-100 mt-2 shadow-xl">
                <div className="card-actions justify-end">
                  <Link to="/" className="btn btn-ghost">
                    <ArrowLeftFromLine />
                  </Link>
                </div>
             
           
              
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PokemonDetail;
