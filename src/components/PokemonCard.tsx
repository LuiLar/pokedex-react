import { capitalizeWords } from "../utils/utils";
import "./PokemonCard.css";

interface PokemonCardProps {
  pokemon: Pokemon;
  onClickHandler: () => void;
}

const PokemonCard = ({ pokemon, onClickHandler }: PokemonCardProps) => {
  const { name, defaultSpriteURL: imageUrl } = pokemon;
  return (
    <button id="pokemon-card" onClick={onClickHandler}>
      <h1>{capitalizeWords(name)}</h1>
      <img src={imageUrl} alt={name} />
    </button>
  );
};

export default PokemonCard;
