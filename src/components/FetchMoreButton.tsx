import { useCallback } from "react";
import { fetchNextPokemonBatch } from "../utils/pokemonStore";
import "./FetchMoreButton.css";

const FetchMoreButton = () => {
  const handleClick = useCallback(() => fetchNextPokemonBatch(), []);

  return (
    <div className="fetchmore-container">
      <button className="fetchmore-button" onClick={handleClick}>
        Fetch More
      </button>
    </div>
  );
};

export default FetchMoreButton;
