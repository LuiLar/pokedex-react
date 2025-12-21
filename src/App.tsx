import { useEffect } from "react";
import "./App.css";
import PokemonCard from "./components/PokemonCard";
import PokemonDetails from "./components/PokemonDetails";
import {
  usePokemonStore,
  fetchAndSavePokemonNames,
  fetchNextPokemonBatch,
  isMorePokemonToFetch,
} from "./utils/pokemonStore";
import FetchMoreButton from "./components/FetchMoreButton";

function App() {
  const { pokemons } = usePokemonStore();

  useEffect(() => {
    fetchAndSavePokemonNames().then(() => fetchNextPokemonBatch());
  }, []);

  return (
    <main>
      <div className="pokemon-grid">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      {isMorePokemonToFetch() && <FetchMoreButton />}
      <PokemonDetails />
    </main>
  );
}

export default App;
