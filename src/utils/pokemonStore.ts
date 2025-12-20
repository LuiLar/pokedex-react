import { create } from 'zustand';

interface PokemonStore {
  pokemons: Pokemon[];
  dialogRef: HTMLDialogElement | null;
  selectedPokemon: Pokemon | null;
  setPokemons: (newPokemons: Pokemon[]) => void;
  registerDialogRef: (ref: HTMLDialogElement | null) => void;
  openDialog: (pokemonData: Pokemon) => void;
  closeDialog: () => void;
}

export const usePokemonStore = create<PokemonStore>((set) => ({
  pokemons: [],
  dialogRef: null,
  selectedPokemon: null,
  setPokemons: (newPokemons) => set({ pokemons: newPokemons }),
  registerDialogRef: (ref: HTMLDialogElement | null) =>
    set(() => ({ dialogRef: ref })),
  openDialog: (pokemonData: Pokemon) =>
    set((state) => {
      state.dialogRef?.showModal();
      return { selectedPokemon: pokemonData };
    }),
  closeDialog: () =>
    set((state) => {
      state.dialogRef?.close();
      return { selectedPokemon: null };
    }),
}));
