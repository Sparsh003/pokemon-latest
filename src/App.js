import Header from "./Components/Header";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Pokemon from "./Components/Pokemon";
import { Route, Routes } from "react-router-dom";
import PokemonDetail from "./Components/PokemonDetail";
import MyPokemonList from "./Components/MyPokemonList";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Pokemon />} />
        <Route path="/pokemonDetail/:pokemonName" element={<PokemonDetail />} />
        <Route path="/mypokemonList" element={<MyPokemonList />} />
      </Routes>
    </>
  );
}

export default App;
