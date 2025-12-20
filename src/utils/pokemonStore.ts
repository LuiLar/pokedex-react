import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { fetchPokemonByName, fetchPokemonNames } from '../services/pokeApi';
import { formatPokemonData } from './utils';

const BATCH_SIZE = import.meta.env.VITE_BATCH_SIZE as number ?? 20;

interface PokemonStore {
  currentBatch: number;
  pokemonNames: string[];
  pokemons: Pokemon[];
  dialogRef: HTMLDialogElement | null;
  selectedPokemon: Pokemon | null;
}

export const usePokemonStore = create<PokemonStore>()(
  devtools(() => ({
    currentBatch: 0,
    pokemonNames: [],
    pokemons: [],
    dialogRef: null,
    selectedPokemon: null,
  }))
)

export const fetchAndSavePokemonNames = async () => {
  try {
    const { results } = await fetchPokemonNames();

    const newNames = results.flatMap(({ name }) => name);

    usePokemonStore.setState({ pokemonNames: newNames }, undefined, 'SAVE_POKEMON_NAMES');
  } catch (error) {
    console.error(error);
  }
}

export const fetchNextPokemonBatch = () => {
  const pokemonQueryPromises: Promise<PokemonApiResponse>[] = [];
  const { currentBatch, pokemonNames, pokemons } = usePokemonStore.getState();

  const startIndex = currentBatch;
  const endIndex = startIndex + +BATCH_SIZE;

  const nextBatchNames = pokemonNames.slice(startIndex, endIndex);

  nextBatchNames.forEach(name => pokemonQueryPromises.push(fetchPokemonByName(name)));

  Promise.all(pokemonQueryPromises)
    .then((pokemonData) => {
      usePokemonStore.setState({
        pokemons: [
          ...pokemons,
          ...pokemonData.map((data) => formatPokemonData(data)),
        ],
        currentBatch: endIndex,
      }, undefined, 'NEXT_POKEMON_BATCH');
    })
    .catch((error) => {
      console.error("Error fetching next Pokémon batch:", error);
    });
}

export const registerDialogRef = (dialogElement: HTMLDialogElement | null) =>
  usePokemonStore.setState({ dialogRef : dialogElement }, undefined, 'REGISTER_DIALOG_REF');

export const openDialog = (pokemonData: Pokemon) => {
  usePokemonStore.getState().dialogRef?.showModal();
  usePokemonStore.setState({ selectedPokemon: pokemonData }, undefined, 'OPEN_DIALOG');
}

export const closeDialog = () => {
  usePokemonStore.getState().dialogRef?.close();
  usePokemonStore.setState({ selectedPokemon: null }, undefined, 'CLOSE_DIALOG');
}
