import { useEffect, useState } from "react";
import { fetchPokemonByUrl, fetchPokemons } from "../services/pokeApi";
import { useQuery } from "@tanstack/react-query";
import { formatPokemonData } from "../utils/utils";

const usePokemons = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const { data, isSuccess } = useQuery({
    queryKey: ["pokemons"],
    queryFn: fetchPokemons,
  });

  useEffect(() => {
    if (isSuccess && data) {
      const pokemonQueryPromises: Promise<PokemonApiResponse>[] = [];

      data.results.map(({ url }) =>
        pokemonQueryPromises.push(fetchPokemonByUrl(url)),
      );

      Promise.all(pokemonQueryPromises)
        .then((pokemonData) => {
          const formattedPokemons = pokemonData.map((data) =>
            formatPokemonData(data),
          );
          setPokemons(formattedPokemons);
        })
        .catch((error) => {
          console.error("Error fetching Pokémon data:", error);
        });
    }
  }, [data, isSuccess]);

  return { pokemons };
};

export default usePokemons;
