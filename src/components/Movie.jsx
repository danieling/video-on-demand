import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BsPlayCircle } from "react-icons/bs";
import { useLocalStorage } from "../core/useLocalStorage";
import { Link } from "react-router-dom";

const Movie = ({ movie }) => {
  const [like, setLike] = useState(false);
  const [favMovies, setFavMovies] = useLocalStorage("favMovies", []);

  const isLiked = () => {
    favMovies.forEach((m) => {
      if (m.id === movie.id) {
        setLike(true);
      }
    });
  };

  useEffect(() => {
    isLiked();
  });

  const saveShow = () => {
    setLike(!like);
    if (!like) {
      favMovies.push(movie);
      setFavMovies(favMovies);
    } else {
      const pelis = favMovies.filter((p) => p.id != movie.id);
      setFavMovies(pelis);
    }
  };

  return (
    <div className="inline-block cursor-pointer w-[160px] sm:w-[230px] lg:w-[313px] relative p-2">
      <img
        loading="lazy"
        src={
          movie?.backdrop_path
            ? `https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`
            : "https://img.freepik.com/premium-vector/modern-minimal-found-error-icon-oops-page-found-404-error-page-found-with-concept_599740-716.jpg?w=720"
        }
        alt={movie?.title}
        className="w-full block"
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
        <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
          <Link
            to={`/pelis/${movie?.title.replaceAll(" ", "-")}/${movie?.id}`}
            state={{ peli: movie }}
          >
            <BsPlayCircle className="text-5xl text-lime-500" />
          </Link>
        </p>
        <p onClick={saveShow}>
          {like ? (
            <FaHeart className="absolute top-4 left-4 text-red-500" />
          ) : (
            <FaRegHeart className="absolute top-4 left-4 text-red-300" />
          )}
        </p>
      </div>
      <p className="text-center">
        {movie?.title.length > 20
          ? movie?.title.substring(0, 20) + "..."
          : movie?.title}
      </p>
    </div>
  );
};

export default Movie;
