import { useEffect } from "react";
import "./App.css";
import PokemonCard from "./components/PokemonCard";
import PokemonDetails from "./components/PokemonDetails";
import usePokemons from "./hooks/usePokemons";
import { usePokemonStore } from "./utils/pokemonStore";

function App() {
  const { pokemons } = usePokemons();
  const { setPokemons, pokemons: storedPokemons } = usePokemonStore();

  useEffect(() => setPokemons(pokemons), [pokemons]);

  return (
    <main>
      {storedPokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
      <PokemonDetails />
    </main>
  );
}

export default App;
