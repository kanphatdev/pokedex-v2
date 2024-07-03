import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import PokemonList from "./components/pokemon/PokemonList";
import PokemonDetail from "./pages/PokemonDetail";
import PokemonGrid from "./components/pokemon/PokemonGrid";
import Pocket from "./components/pokemon/Pocket";

function App() {
  return (
    <Router>
      <main>
        <Navbar />
        <div className="pt-16 px-6">
          <Routes>
            <Route path="/" element={<PokemonGrid />} />
            <Route path="/pokemonlist" element={<PokemonList />} />
            <Route path="/pokemon/:name" element={<PokemonDetail />} />
            <Route path="/pocketball/pokemon/:name" element={<Pocket />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App;
