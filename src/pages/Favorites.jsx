import React from "react";
import Movie from "../components/Movie";
import { useLocalStorage } from "../core/useLocalStorage";

const Favorites = () => {
  const [favs, setFavs] = useLocalStorage("favMovies", []);

  return (
    <div className="pt-36 flex flex-wrap">
      {favs.map((movie, id) => (
        <Movie key={id} movie={movie} />
      ))}
    </div>
  );
};

export default Favorites;
