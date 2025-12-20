import { useEffect } from "react";
import "./App.css";
import PokemonCard from "./components/PokemonCard";
import PokemonDetails from "./components/PokemonDetails";
import {
  usePokemonStore,
  fetchAndSavePokemonNames,
  fetchNextPokemonBatch,
} from "./utils/pokemonStore";
import FetchMoreButton from "./components/FetchMoreButton";

function App() {
  const { pokemons } = usePokemonStore();

  useEffect(() => {
    fetchAndSavePokemonNames().then(() => fetchNextPokemonBatch());
  }, []);

  return (
    <main>
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
      <FetchMoreButton />
      <PokemonDetails />
    </main>
  );
}

export default App;
