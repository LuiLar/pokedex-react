import { useCallback, useRef, useState } from "react";
import "./App.css";
import PokemonCard from "./components/PokemonCard";
import PokemonDetails from "./components/PokemonDetails";
import UsePokemons from "./hooks/usePokemons";

function App() {
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null);
  const { pokemons } = UsePokemons();
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const openDialog = useCallback(
    (pokemonData: Pokemon) => {
      setCurrentPokemon(pokemonData);
      dialogRef.current?.showModal();
    },
    [dialogRef],
  );

  return (
    <main>
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          onClickHandler={() => openDialog(pokemon)}
        />
      ))}
      <PokemonDetails ref={dialogRef} pokemonData={currentPokemon} />
    </main>
  );
}

export default App;
