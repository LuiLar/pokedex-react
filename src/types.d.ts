type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  defaultSpriteURL: string;
  shinySpriteURL: string;
}

type AllPokemonsApiResponse = {
  results: { name: string; url: string }[];
}

type PokemonApiResponse = {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    front_shiny: string;
  };
}
