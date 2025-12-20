export const formatPokemonData = (pokemon: PokemonApiResponse): Pokemon => {
  return {
    id: pokemon.id,
    height: pokemon.height,
    weight: pokemon.weight,
    name: pokemon.name,
    defaultSpriteURL: pokemon.sprites.front_default,
    shinySpriteURL: pokemon.sprites.front_shiny,
  };
};

export const capitalizeWords = (str: string): string => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};
