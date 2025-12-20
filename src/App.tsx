import "./App.css";
import PokemonCard from "./components/PokemonCard";
import PokemonDetails from "./components/PokemonDetails";
import usePokemons from "./hooks/usePokemons";

function App() {
  const { pokemons } = usePokemons();

  return (
    <main>
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
      <PokemonDetails />
    </main>
  );
}

export default App;
