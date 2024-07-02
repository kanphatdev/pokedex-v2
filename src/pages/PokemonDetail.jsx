import axios from "axios";
import {
  ArrowLeftFromLine,
  HeartPulse,
  Sword,
  Shield,
  Zap,
  Swords,
  ZapOff,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Skeleton from "../components/UI_State/Skeleton";

const TYPE_COLORS = {
  bug: "B1C12E",
  dark: "4F3A2D",
  dragon: "755EDF",
  electric: "FCBC17",
  fairy: "F4B1F4",
  fighting: "823551D",
  fire: "E73B0C",
  flying: "A3B3F7",
  ghost: "6060B2",
  grass: "74C236",
  ground: "D3B357",
  ice: "A3E7FD",
  normal: "C8C4BC",
  poison: "934594",
  psychic: "ED4882",
  rock: "B9A156",
  steel: "B5B5C3",
  water: "3295F6",
};

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

        // Fetch species details to get the description and catch rate
        let speciesResponse = await axios.get(response.data.species.url);
        let speciesData = speciesResponse.data;

        setPoke({
          ...response.data,
          description: speciesData.flavor_text_entries.find(
            (entry) => entry.language.name === "en" // Filter for English description
          ).flavor_text,
          catchRate: speciesData.capture_rate, // Add catch rate
        });
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
  }, [name]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Extract the HP, Attack, Defense, Speed, Special Attack, and Special Defense stats from the stats array
  const hpStat = poke?.stats.find((stat) => stat.stat.name === "hp");
  const attackStat = poke?.stats.find((stat) => stat.stat.name === "attack");
  const defenseStat = poke?.stats.find((stat) => stat.stat.name === "defense");
  const speedStat = poke?.stats.find((stat) => stat.stat.name === "speed");
  const specialAttackStat = poke?.stats.find(
    (stat) => stat.stat.name === "special-attack"
  );
  const specialDefenseStat = poke?.stats.find(
    (stat) => stat.stat.name === "special-defense"
  );

  // Get the primary type and its color
  const primaryType = poke?.types[0]?.type.name;
  const primaryTypeColor = TYPE_COLORS[primaryType];

  return (
    <div className="hero sticky bg-base-200 min-h-screen">
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
                <div className="card-actions justify-start">
                  <Link to="/" className="btn btn-ghost">
                    <ArrowLeftFromLine />
                  </Link>
                </div>
                <div className="py-6 flex gap-4">
                  {/* stat section */}
                  <div className="">
                    <div className="flex gap-3 items-center justify-center py-3">
                      <p className="uppercase">
                        <HeartPulse style={{ color: `#${primaryTypeColor}` }} />
                      </p>
                      <progress
                        className="progress w-96"
                        value={hpStat?.base_stat}
                        max="100"
                        style={{ backgroundColor: `#${primaryTypeColor}` }}
                      ></progress>
                      <span style={{ color: `#${primaryTypeColor}` }}>
                        {hpStat?.base_stat}
                      </span>
                    </div>
                    <div className="flex gap-3 items-center justify-center py-3">
                      <p className="uppercase">
                        <Sword style={{ color: `#${primaryTypeColor}` }} />
                      </p>
                      <progress
                        className="progress w-96"
                        value={attackStat?.base_stat}
                        max="100"
                        style={{ backgroundColor: `#${primaryTypeColor}` }}
                      ></progress>
                      <span style={{ color: `#${primaryTypeColor}` }}>
                        {attackStat?.base_stat}
                      </span>
                    </div>
                    <div className="flex gap-3 items-center justify-center py-3">
                      <p className="uppercase">
                        <Shield style={{ color: `#${primaryTypeColor}` }} />
                      </p>
                      <progress
                        className="progress w-96"
                        value={defenseStat?.base_stat}
                        max="100"
                        style={{ backgroundColor: `#${primaryTypeColor}` }}
                      ></progress>
                      <span style={{ color: `#${primaryTypeColor}` }}>
                        {defenseStat?.base_stat}
                      </span>
                    </div>
                    <div className="flex gap-3 items-center justify-center py-3">
                      <p className="uppercase">
                        <Zap style={{ color: `#${primaryTypeColor}` }} />
                      </p>
                      <progress
                        className="progress w-96"
                        value={speedStat?.base_stat}
                        max="100"
                        style={{ backgroundColor: `#${primaryTypeColor}` }}
                      ></progress>
                      <span style={{ color: `#${primaryTypeColor}` }}>
                        {speedStat?.base_stat}
                      </span>
                    </div>
                    <div className="flex gap-3 items-center justify-center py-3">
                      <p className="uppercase">
                        <Swords style={{ color: `#${primaryTypeColor}` }} />
                      </p>
                      <progress
                        className="progress w-96"
                        value={specialAttackStat?.base_stat}
                        max="100"
                        style={{ backgroundColor: `#${primaryTypeColor}` }}
                      ></progress>
                      <span style={{ color: `#${primaryTypeColor}` }}>
                        {specialAttackStat?.base_stat}
                      </span>
                    </div>
                    <div className="flex gap-3 items-center justify-center py-3">
                      <p className="uppercase">
                        <ZapOff style={{ color: `#${primaryTypeColor}` }} />
                      </p>
                      <progress
                        className="progress w-96"
                        value={specialDefenseStat?.base_stat}
                        max="100"
                        style={{ backgroundColor: `#${primaryTypeColor}` }}
                      ></progress>
                      <span style={{ color: `#${primaryTypeColor}` }}>
                        {specialDefenseStat?.base_stat}
                      </span>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-8 max-w-sm">
                      <p className="text-gray-600 mb-6 capitalize">
                        {poke.description}
                      </p>
                    </div>
                  </div>
                  {/* close stat section */}
                  <div className="">
                    <div className="stats shadow">
                      <div className="stat place-items-center">
                        <div className="stat-title uppercase">Height</div>
                        <div className="stat-value">{poke.height}</div>
                        <div className="stat-desc capitalize">
                          Height of {poke.name}
                        </div>
                      </div>

                      <div className="stat place-items-center">
                        <div className="stat-title uppercase">Weight</div>
                        <div className="stat-value ">{poke.weight}</div>
                        <div className="stat-desc capitalize">
                          Weight of {poke.name}
                        </div>
                      </div>

                      <div className="stat place-items-center">
                        <div className="stat-title">Catch Rate</div>
                        <div
                          className="stat-value"
                          style={{ color: `#${primaryTypeColor}` }}
                        >
                          {poke.catchRate}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-actions justify-end flex gap-4 ">
                  {poke.types.map((typeObj, index) => (
                    <span
                      key={index}
                      className="capitalize badge badge-ghost"
                      style={{
                        backgroundColor: `#${TYPE_COLORS[typeObj.type.name]}`,
                        color: "white",
                      }}
                    >
                      {typeObj.type.name}
                    </span>
                  ))}
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
