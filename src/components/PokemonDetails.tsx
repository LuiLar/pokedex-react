import { useCallback, useRef, useEffect } from "react";
import "./PokemonDetails.css";
import { capitalizeWords } from "../utils/utils";
import { usePokemonStore, registerDialogRef } from "../utils/pokemonStore";

const PokemonDetails = () => {
  const ref = useRef<HTMLDialogElement | null>(null);
  const selectedPokemon = usePokemonStore((state) => state.selectedPokemon);

  useEffect(() => registerDialogRef(ref.current), [registerDialogRef]);

  const onClickHandler = useCallback(
    (e: React.MouseEvent) => {
      const dimensions = ref.current?.getBoundingClientRect();
      if (!dimensions) return;

      if (
        e.clientX < dimensions.left ||
        e.clientX > dimensions.right ||
        e.clientY < dimensions.top ||
        e.clientY > dimensions.bottom
      ) {
        ref.current?.close();
      }
    },
    [ref],
  );

  return (
    <dialog ref={ref} onClick={onClickHandler}>
      <h2>{capitalizeWords(selectedPokemon?.name || "")}</h2>
      <img src={selectedPokemon?.shinySpriteURL} alt={selectedPokemon?.name} />
    </dialog>
  );
};

export default PokemonDetails;
