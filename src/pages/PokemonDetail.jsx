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

        // Fetch species details to get the description, catch rate, and gender ratio
        let speciesResponse = await axios.get(response.data.species.url);
        let speciesData = speciesResponse.data;

        // Extract egg groups
        let eggGroups = speciesData.egg_groups.map((group) => group.name);

        setPoke({
          ...response.data,
          description: speciesData.flavor_text_entries.find(
            (entry) => entry.language.name === "en" // Filter for English description
          ).flavor_text,
          catchRate: speciesData.capture_rate, // Add catch rate
          eggGroups: eggGroups.join(", "), // Convert egg groups array to string
          primaryType: response.data.types[0].type.name, // Get primary type
          genderRatio: speciesData.gender_rate, // Add gender ratio
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

  // Extract the stats from the stats array
  const stats = poke?.stats.reduce((accumulator, stat) => {
    accumulator[stat.stat.name] = stat.base_stat;
    return accumulator;
  }, {});

  return (
    <div className="hero sticky bg-base-200 min-h-screen">
      <div className="hero-content flex flex-col lg:flex-row">
        {poke && (
          <>
            <img
              src={poke.sprites.other["official-artwork"].front_default}
              alt={poke.name}
              className="max-w-xs lg:max-w-sm rounded-lg shadow-2xl mb-4 lg:mb-0"
            />
            <div>
              <h1 className="text-5xl font-bold capitalize">{poke.name}</h1>
              <div className="py-6 px-6 card bg-base-100 mt-2 shadow-xl">
                <div className="card-actions justify-start">
                  <Link to="/" className="btn btn-ghost">
                    <ArrowLeftFromLine />
                  </Link>
                </div>
                <div className="py-6 flex flex-col lg:flex-row gap-4">
                  {/* Stats Section */}
                  <div className="w-full lg:w-1/2">
                    {['hp', 'attack', 'defense', 'speed', 'special-attack', 'special-defense'].map((stat) => (
                      <div key={stat} className="flex gap-3 items-center justify-center py-3">
                        <p className="uppercase">
                          {stat === 'hp' && <HeartPulse className="text-red-400" />}
                          {stat === 'attack' && <Sword className="text-yellow-400" />}
                          {stat === 'defense' && <Shield className="text-blue-400" />}
                          {stat === 'speed' && <Zap className="text-green-400" />}
                          {stat === 'special-attack' && <Swords className="text-purple-400" />}
                          {stat === 'special-defense' && <ZapOff className="text-cyan-400" />}
                        </p>
                        <progress
                          className="progress w-full lg:w-96"
                          value={stats[stat]}
                          max="100"
                          style={{ backgroundColor: `#${TYPE_COLORS[poke.primaryType]}` }}
                        ></progress>
                        <span className={`text-${TYPE_COLORS[poke.primaryType]}`}>{stats[stat]}</span>
                      </div>
                    ))}
                    <div className="bg-white shadow-md rounded-lg p-8 mt-4 lg:mt-0 max-w-full lg:max-w-sm">
                      <p className="text-gray-600 mb-6 capitalize">
                        {poke.description}
                      </p>
                    </div>
                  </div>
                  {/* End Stats Section */}
                  <div className="w-full lg:w-1/2">
                    <div className="stats shadow flex flex-col lg:flex-row gap-4">
                      {/* Egg Groups */}
                      <div className="stat">
                        <div className="stat-title text-gray-600">Egg Groups</div>
                        <div className="stat-value capitalize">
                          <div className="badge badge-ghost text-white" style={{ backgroundColor: `#${TYPE_COLORS[poke.primaryType]}` }}>
                            {poke.eggGroups}
                          </div>
                        </div>
                        <div className="stat-desc text-center text-gray-500 capitalize">Race of {poke.name}</div>
                      </div>

                      {/* Abilities */}
                      <div className="stat">
                        <div className="stat-title text-gray-600">Abilities</div>
                        <div className="stat-value flex flex-wrap gap-2 justify-center">
                          {poke.abilities.map((abilityObj, index) => (
                            <span key={index} className="badge badge-ghost capitalize text-white" style={{ backgroundColor: `#${TYPE_COLORS[poke.primaryType]}` }}>
                              {abilityObj.ability.name}
                            </span>
                          ))}
                        </div>
                        <div className="stat-desc text-gray-500 capitalize text-center">Abilities of {poke.name}</div>
                      </div>

                      {/* Gender Ratio */}
                      <div className="stat">
                        <div className="stat-title text-gray-600">Gender Ratio</div>
                        <div className="stat-value">
                          <progress
                            className="progress w-full lg:w-96"
                            value={poke.genderRatio}
                            max="8"
                            style={{ backgroundColor: `#${TYPE_COLORS[poke.primaryType]}` }}
                          ></progress>
                          <span className="text-gray-600">{poke.genderRatio} : {(8 - poke.genderRatio)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="flex justify-center items-center py-6">
                      <div className="stats stats-vertical lg:stats-horizontal shadow">
                        <div className="stat place-items-center">
                          <div className="stat-title uppercase">Height</div>
                          <div className="stat-value" style={{ color: `#${TYPE_COLORS[poke.primaryType]}` }}>
                            {poke.height}
                          </div>
                          <div className="stat-desc capitalize">Height of {poke.name}</div>
                        </div>

                        <div className="stat place-items-center">
                          <div className="stat-title uppercase">Weight</div>
                          <div className="stat-value" style={{ color: `#${TYPE_COLORS[poke.primaryType]}` }}>
                            {poke.weight}
                          </div>
                          <div className="stat-desc capitalize">Weight of {poke.name}</div>
                        </div>

                        <div className="stat place-items-center">
                          <div className="stat-title">Catch Rate</div>
                          <div className="stat-value" style={{ color: `#${TYPE_COLORS[poke.primaryType]}` }}>
                            {poke.catchRate}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* End Additional Info */}
                  </div>
                </div>
                {/* Types */}
                <div className="card-actions justify-end flex flex-wrap gap-4">
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
                {/* End Types */}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PokemonDetail;
