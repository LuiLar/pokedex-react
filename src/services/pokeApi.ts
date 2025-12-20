const POKEAPI_URL = import.meta.env.VITE_POKEAPI_URL as string;

export const fetchPokemonNames = async (): Promise<AllPokemonsApiResponse> => {
  try {
    const response = await fetch(`${POKEAPI_URL}/pokemon?limit=100000`);

    if (!response.ok) {
      throw new Error(`Error fetching pokemons: ${response.statusText}`);
    }

    return await response.json() as AllPokemonsApiResponse;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Unknown error occurred while fetching pokemons');
  }
}

export const fetchPokemonByName = async (name: string): Promise<PokemonApiResponse> => {
  try {
    const response = await fetch(`${POKEAPI_URL}/pokemon/${name}`);

    if (!response.ok) {
      throw new Error(`Error fetching pokemon: ${response.statusText}`);
    }

    return await response.json() as PokemonApiResponse;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Unknown error occurred while fetching pokemon');
  }
}
