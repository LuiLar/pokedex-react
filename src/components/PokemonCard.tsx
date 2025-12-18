import "./PokemonCard.css";

const PokemonCard = ({ name, imageUrl }: Pokemon) => (
  <div id="pokemon-card">
    <h1>{name.charAt(0).toUpperCase() + name.slice(1)}</h1>
    <img src={imageUrl} alt={name} />
  </div>
);

export default PokemonCard;
