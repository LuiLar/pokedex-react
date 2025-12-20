import { useEffect, useState } from "react";
import { fetchPokemonByUrl, fetchPokemons } from "../services/pokeApi";
import { formatPokemonData } from "../utils/utils";
import { usePokemonStore } from "../utils/pokemonStore";

const usePokemons = () => {
  const [pokeApiData, setPokeApiData] = useState<AllPokemonsApiResponse>({
    results: [],
  });
  const pokemons = usePokemonStore((state) => state.pokemons);
  const setPokemons = usePokemonStore((state) => state.setPokemons);

  useEffect(() => {
    fetchPokemons()
      .then((data) => setPokeApiData(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const resolvedPokemons: Pokemon[] = [];
    const promises: Promise<PokemonApiResponse>[] = [];

    pokeApiData.results.forEach(({ url }) =>
      promises.push(fetchPokemonByUrl(url)),
    );

    Promise.all(promises)
      .then((pokemonData) => {
        pokemonData.forEach((pokemon) =>
          resolvedPokemons.push(formatPokemonData(pokemon)),
        );
      })
      .catch((error) => console.error(error))
      .finally(() => setPokemons(resolvedPokemons));
  }, [pokeApiData, setPokemons]);

  return { pokemons };
};

export default usePokemons;
