import { useEffect, useState } from "react";
import { fetchPokemonByUrl, fetchPokemons } from "../services/pokeApi";
import { formatPokemonData } from "../utils/formatPokemonData";

const UsePokemons = () => {
  const [pokeApiData, setPokeApiData] = useState<AllPokemonsApiResponse>({
    results: [],
  });
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetchPokemons()
      .then((data) => setPokeApiData(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const promises: Promise<PokemonApiResponse>[] = [];

    pokeApiData.results.forEach(({ url }) =>
      promises.push(fetchPokemonByUrl(url)),
    );

    Promise.all(promises)
      .then((pokemonData) => {
        pokemonData.forEach((pokemon) =>
          setPokemons((prev) => [...prev, formatPokemonData(pokemon)]),
        );
      })
      .catch((error) => console.error(error));
  }, [pokeApiData]);

  return { pokemons };
};

export default UsePokemons;
