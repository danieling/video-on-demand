import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { traerFeatured } from "../core/Traidor";
import { useLocalStorage } from "../core/useLocalStorage";

const Feature = () => {
  const [featured, setFeatured] = useState();

  // async function loadMovies() {
  //   const response = await fetch(requests.popular)
  //   const data = await response.json()
  //   setMovies(data.results)
  // }

  const [like, setLike] = useState(false);
  const [favMovies, setFavMovies] = useLocalStorage("favMovies", []);

  const isLiked = () => {
    favMovies.forEach((m) => {
      if (m.id === featured?.id) {
        setLike(true);
      }
    });
  };

  const saveShow = () => {
    setLike(!like);
    if (!like) {
      favMovies.push(featured);
      setFavMovies(favMovies);
    } else {
      const pelis = favMovies.filter((p) => p.id != featured?.id);
      setFavMovies(pelis);
    }
  };

  console.log("feature");
  useEffect(() => {
    Promise.resolve(traerFeatured()).then((peli) => {
      setFeatured(peli);
      isLiked();
    });
  }, []);

  return (
    <div className="w-full h-[550px] lg:h-[800px] text-white">
      <div className="w-full h-full">
        <div className="absolute w-full h-[550px] lg:h-[800px] bg-gradient-to-r from-black"></div>
        <img
          className="w-full h-full object-fill"
          src={
            featured?.backdrop_path
              ? `https://image.tmdb.org/t/p/original/${featured?.backdrop_path}`
              : "https://img.freepik.com/premium-vector/modern-minimal-found-error-icon-oops-page-found-404-error-page-found-with-concept_599740-716.jpg?w=720"
          }
          alt="Movie Poster"
        />
        <div className="absolute w-full top-[20%] p-4 md:p-8">
          <h2 className="shadow-black text-3xl md:text-5xl font-bold">
            {featured?.title}
          </h2>
          <div className="my-4 flex" style={{ width: 100 }}>
            <Link
              to={`/pelis/${featured?.title.replaceAll(" ", "-")}/${
                featured?.id
              }`}
              state={{ peli: featured }}
            >
              <button className="border-r-zinc-400 bg-gray-300 text-black border-gray-300 py-2 px-5">
                Play
              </button>
            </Link>

            <p onClick={saveShow} className="ml-5 cursor-pointer">
              {like ? (
                <FaHeart className="top-14 ml-4  h-11 w-7 text-red-500" />
              ) : (
                <FaRegHeart className="top-14 ml-4  h-11 w-7 text-red-300" />
              )}
            </p>
          </div>
          <p className="text-gray-400 shadow-black text-sm">
            Released: {featured?.release_date}
          </p>
          <p className="w-full shadow-black md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
            {featured?.overview}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Feature;
