import { useCallback } from "react";
import { usePokemonStore } from "../utils/pokemonStore";
import { capitalizeWords } from "../utils/utils";
import "./PokemonCard.css";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const { name, defaultSpriteURL } = pokemon;
  const openDialog = usePokemonStore((state) => state.openDialog);

  const handleClick = useCallback(
    () => openDialog(pokemon),
    [openDialog, pokemon],
  );

  return (
    <button id="pokemon-card" onClick={handleClick}>
      <h1>{capitalizeWords(name)}</h1>
      <img src={defaultSpriteURL} alt={name} />
    </button>
  );
};

export default PokemonCard;
