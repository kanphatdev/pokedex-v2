import PokemonList from "./pokemon/PokemonList";


const Dashboard = () => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-12 ">
       <PokemonList/>
      </div>
    </div>
  );
};

export default Dashboard;
