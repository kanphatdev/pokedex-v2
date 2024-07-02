import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Skeleton from "../components/UI_State/Skeleton";
import {
  ArrowLeftFromLine,
  HeartPulse,
  Sword,
  Shield,
  Zap,
  Swords,
  ZapOff,
} from "lucide-react";

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

const PokemonDetail = () => {
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
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content">
        {poke && (
          <div className="container mx-auto p-6 lg:p-12">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="max-w-xs lg:max-w-sm rounded-lg shadow-2xl mb-4 lg:mb-0">
                <img
                  src={poke.sprites.other["official-artwork"].front_default}
                  alt={poke.name}
                  className="w-full rounded-lg"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-4xl lg:text-5xl font-bold capitalize">
                    {poke.name}
                  </h1>
                  <Link to="/" className="btn btn-ghost">
                    <ArrowLeftFromLine className="w-6 h-6 mr-2" />
                    Back
                  </Link>
                </div>
                <div className="card bg-base-100 shadow-xl p-6">
                  <div className="flex flex-wrap gap-4">
                    {/* Stats Section */}
                    <div className="w-full lg:w-1/2">
                      {[
                        "hp",
                        "attack",
                        "defense",
                        "speed",
                        "special-attack",
                        "special-defense",
                      ].map((stat) => (
                        <div
                          key={stat}
                          className="flex items-center justify-between mb-4"
                        >
                          <p className="uppercase">
                            {stat === "hp" && (
                              <HeartPulse className="text-red-400 w-6 h-6 mr-2" />
                            )}
                            {stat === "attack" && (
                              <Sword className="text-yellow-400 w-6 h-6 mr-2" />
                            )}
                            {stat === "defense" && (
                              <Shield className="text-blue-400 w-6 h-6 mr-2" />
                            )}
                            {stat === "speed" && (
                              <Zap className="text-green-400 w-6 h-6 mr-2" />
                            )}
                            {stat === "special-attack" && (
                              <Swords className="text-purple-400 w-6 h-6 mr-2" />
                            )}
                            {stat === "special-defense" && (
                              <ZapOff className="text-cyan-400 w-6 h-6 mr-2" />
                            )}
                            {stat.toUpperCase()}
                          </p>
                          <progress
                            className="progress w-full"
                            value={stats[stat]}
                            max="100"
                            style={{
                              backgroundColor: `#${TYPE_COLORS[poke.primaryType]}`,
                            }}
                          ></progress>
                          <span
                            className={`text-xs text-gray-600 font-semibold`}
                          >
                            {stats[stat]}
                          </span>
                        </div>
                      ))}
                      <div className="bg-white shadow-md rounded-lg p-4 mt-4">
                        <p className="text-gray-600">{poke.description}</p>
                      </div>
                    </div>
                    {/* End Stats Section */}
                    <div className="w-full lg:w-1/2">
                      <div className="flex flex-col gap-4">
                        {/* Egg Groups */}
                        <div className="bg-base-100 shadow p-4 rounded-lg">
                          <div className="text-gray-600 mb-2">Egg Groups</div>
                          <div className="flex gap-2">
                            <div
                              className="badge text-white capitalize"
                              style={{
                                backgroundColor: `#${TYPE_COLORS[poke.primaryType]}`,
                              }}
                            >
                              {poke.eggGroups}
                            </div>
                          </div>
                        </div>

                        {/* Abilities */}
                        <div className="bg-base-100 shadow p-4 rounded-lg">
                          <div className="text-gray-600 mb-2">Abilities</div>
                          <div className="flex flex-wrap gap-2">
                            {poke.abilities.map((abilityObj, index) => (
                              <div
                                key={index}
                                className="badge text-white capitalize"
                                style={{
                                  backgroundColor: `#${TYPE_COLORS[poke.primaryType]}`,
                                }}
                              >
                                {abilityObj.ability.name}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Gender Ratio */}
                        <div className="bg-base-100 shadow p-4 rounded-lg">
                          <div className="text-gray-600 mb-2">Gender Ratio</div>
                          <div className="flex items-center gap-2">
                            <progress
                              className="progress w-full"
                              value={poke.genderRatio * 12.5} // Convert gender ratio to percentage
                              max="100"
                              style={{
                                backgroundColor: `#${TYPE_COLORS[poke.primaryType]}`,
                              }}
                            ></progress>
                            <span className="text-xs text-gray-600 font-semibold">
                              {poke.genderRatio} : {8 - poke.genderRatio}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Types */}
                  <div className="flex justify-end mt-4">
                    {poke.types.map((typeObj, index) => (
                      <div
                        key={index}
                        className="badge text-white capitalize"
                        style={{
                          backgroundColor: `#${TYPE_COLORS[typeObj.type.name]}`,
                        }}
                      >
                        {typeObj.type.name}
                      </div>
                    ))}
                  </div>
                  {/* End Types */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonDetail;
