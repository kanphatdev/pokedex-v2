import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { HeartPulse, Sword, Shield, Zap, Swords, ZapOff, ShoppingBag, ArrowLeftFromLine } from "lucide-react";
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

  const addToPocket = () => {
    // Implement your logic to add the Pokemon to the pocket
    console.log(`Added ${poke.name} to pocket!`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Extract the stats from the stats array
  const stats = poke?.stats.reduce((accumulator, stat) => {
    accumulator[stat.stat.name] = stat.base_stat;
    return accumulator;
  }, {});

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
                  {/* Stats Section */}
                  <div className="">
                    <div className="flex gap-3 items-center justify-center py-3">
                      <p className="uppercase">
                        <HeartPulse className="text-red-400" />
                      </p>
                      <progress
                        className="progress w-96"
                        value={stats.hp}
                        max="100"
                        style={{ backgroundColor: `#${TYPE_COLORS[poke.primaryType]}` }}
                      ></progress>
                      <span className="text-red-400">{stats.hp}</span>
                    </div>
                    <div className="flex gap-3 items-center justify-center py-3">
                      <p className="uppercase">
                        <Sword className="text-yellow-400" />
                      </p>
                      <progress
                        className="progress w-96"
                        value={stats.attack}
                        max="100"
                        style={{ backgroundColor: `#${TYPE_COLORS[poke.primaryType]}` }}
                      ></progress>
                      <span className="text-yellow-400">{stats.attack}</span>
                    </div>
                    <div className="flex gap-3 items-center justify-center py-3">
                      <p className="uppercase">
                        <Shield className="text-blue-400" />
                      </p>
                      <progress
                        className="progress w-96"
                        value={stats.defense}
                        max="100"
                        style={{ backgroundColor: `#${TYPE_COLORS[poke.primaryType]}` }}
                      ></progress>
                      <span className="text-blue-400">{stats.defense}</span>
                    </div>
                    <div className="flex gap-3 items-center justify-center py-3">
                      <p className="uppercase">
                        <Zap className="text-green-400" />
                      </p>
                      <progress
                        className="progress w-96"
                        value={stats.speed}
                        max="100"
                        style={{ backgroundColor: `#${TYPE_COLORS[poke.primaryType]}` }}
                      ></progress>
                      <span className="text-green-400">{stats.speed}</span>
                    </div>
                    <div className="flex gap-3 items-center justify-center py-3">
                      <p className="uppercase">
                        <Swords className="text-purple-400" />
                      </p>
                      <progress
                        className="progress w-96"
                        value={stats["special-attack"]}
                        max="100"
                        style={{ backgroundColor: `#${TYPE_COLORS[poke.primaryType]}` }}
                      ></progress>
                      <span className="text-purple-400">{stats["special-attack"]}</span>
                    </div>
                    <div className="flex gap-3 items-center justify-center py-3">
                      <p className="uppercase">
                        <ZapOff className="text-cyan-400" />
                      </p>
                      <progress
                        className="progress w-96"
                        value={stats["special-defense"]}
                        max="100"
                        style={{ backgroundColor: `#${TYPE_COLORS[poke.primaryType]}` }}
                      ></progress>
                      <span className="text-cyan-400">{stats["special-defense"]}</span>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-8 max-w-sm">
                      <p className="text-gray-600 mb-6 capitalize">
                        {poke.description}
                      </p>
                    </div>
                  </div>
                  {/* End Stats Section */}
                  <div className="">
                    <div className="stats shadow">
                      {/* Egg Groups */}
                      <div className="stat">
                        <div className="stat-title text-gray-600">Egg Groups</div>
                        <div className="stat-value capitalize">
                          {/* Wrap in badge for styling */}
                          <div className="badge badge-ghost text-white" style={{ backgroundColor: `#${TYPE_COLORS[poke.primaryType]}` }}>
                            {poke.eggGroups}
                          </div>
                        </div>
                        <div className="stat-desc text-center text-gray-500 capitalize">Race of {poke.name}</div>
                      </div>

                      {/* Abilities */}
                      <div className="stat">
                        <div className="stat-title text-gray-600">Abilities</div>
                        <div className="stat-value flex gap-2">
                          {/* Map through abilities and style each with badge */}
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
                            className="progress"
                            value={poke.genderRatio}
                            max="8" // 8 is the maximum value for gender ratio in Pokémon API
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
                          <div
                            className="stat-value"
                            style={{ color: `#${TYPE_COLORS[poke.primaryType]}` }}
                          >
                            {poke.height}
                          </div>
                          <div className="stat-desc capitalize">
                            Height of {poke.name}
                          </div>
                        </div>

                        <div className="stat place-items-center">
                          <div className="stat-title uppercase">Weight</div>
                          <div
                            className="stat-value"
                            style={{ color: `#${TYPE_COLORS[poke.primaryType]}` }}
                          >
                            {poke.weight}
                          </div>
                          <div className="stat-desc capitalize">
                            Weight of {poke.name}
                          </div>
                        </div>

                        <div className="stat place-items-center">
                          <div className="stat-title">Catch Rate</div>
                          <div
                            className="stat-value"
                            style={{ color: `#${TYPE_COLORS[poke.primaryType]}` }}
                          >
                            {poke.catchRate}
                          </div>
                        </div>
                      </div>
                      
                    </div>
                    {/* End Additional Info */}
                    <div className="flex gap-4 items-center ">
                        <div className=""><button className="btn btn-ghost">+</button></div>
                        <div className="">
                        <span className="badge">0</span>
                        </div>
                        <div className="">
                        <button className="btn btn-ghost">-</button>
                       
                        </div>
                      </div>
                      <div className="flex items-center py-4">
                      <button onClick={addToPocket} className="btn bg-orange-400 text-white mr-8 capitalize">add to pocket <ShoppingBag className="text-white" /></button>

                      </div>
                  </div>
                </div>
                {/* Types */}
                <div className="card-actions justify-end flex gap-4">
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
