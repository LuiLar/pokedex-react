const POKEAPI_URL = import.meta.env.VITE_POKEAPI_URL as string;

export const fetchPokemons = async (): Promise<AllPokemonsApiResponse> => {
  try {
    const response = await fetch(`${POKEAPI_URL}/pokemon`);

    if (!response.ok) {
      throw new Error(`Error fetching pokemons: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Unknown error occurred while fetching pokemons');
  }
}

export const fetchPokemonByUrl = async (url: string): Promise<PokemonApiResponse> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching pokemon: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Unknown error occurred while fetching pokemon');
  }
}
