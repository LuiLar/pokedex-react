import { useCallback } from "react";
import "./PokemonDetails.css";
import { capitalizeWords } from "../utils/utils";

interface PokemonDetailsProps {
  ref: React.RefObject<HTMLDialogElement | null>;
  pokemonData?: Pokemon | null;
}

const PokemonDetails = ({ ref, pokemonData }: PokemonDetailsProps) => {
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
      <h2>{capitalizeWords(pokemonData?.name || "")}</h2>
      <img src={pokemonData?.shinySpriteURL} alt={pokemonData?.name} />
    </dialog>
  );
};

export default PokemonDetails;
