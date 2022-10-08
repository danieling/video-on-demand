import React from "react";
import { Helmet } from "react-helmet-async";
import Movie from "../components/Movie";
import { useLocalStorage } from "../core/useLocalStorage";

const Favorites = () => {
  const [favs, setFavs] = useLocalStorage("favMovies", []);

  return (
    <div className="pt-36 flex flex-wrap">
      <Helmet>
        <title>Favoritos</title>
        <link rel="canonical" href="/favoritos" />
        <meta
          name="description"
          content="En esta sección encontrarás tus peliculas y series favoritas. Para añadir un favorito dale click en el icono de corazón."
        />
      </Helmet>
      {favs.map((movie, id) => (
        <Movie key={id} movie={movie} />
      ))}
    </div>
  );
};

export default Favorites;
