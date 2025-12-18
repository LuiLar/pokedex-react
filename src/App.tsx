import "./App.css";
import PokemonCard from "./components/PokemonCard";
import UsePokemons from "./hooks/usePokemons";

function App() {
  const { pokemons } = UsePokemons();

  return (
    <main>
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} {...pokemon} />
      ))}
    </main>
  );
}

export default App;
