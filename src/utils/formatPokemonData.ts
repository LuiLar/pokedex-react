export const formatPokemonData = (pokemon: PokemonApiResponse): Pokemon => {
  return {
    id: pokemon.id,
    height: pokemon.height,
    weight: pokemon.weight,
    name: pokemon.name,
    imageUrl: pokemon.sprites.front_default,
  };
};
