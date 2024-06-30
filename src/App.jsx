import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App   ">
      <Navbar />
      <div className="pt-16 px-6 ">
        <Dashboard/>
      </div>
    </div>
  );
}

export default App;
