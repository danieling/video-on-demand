import { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { traerPelisPorGenero } from "../core/Traidor";
import Movie from "./Movie";

const Row = ({ title, rowId }) => {
  const [movies, setMovies] = useState([]);

  const fetchPelis = () => {
    Promise.resolve(traerPelisPorGenero(rowId)).then((arrList) => {
      arrList.forEach((peli) => {
        setMovies((movies) => [...movies, peli]);
      });
    });
  };

  useEffect(() => {
    if (movies.length === 0) fetchPelis();
  }, []);

  const slideLeft = () => {
    let slider = document.getElementById("slider" + rowId);
    slider.scrollLeft = slider.scrollLeft - window.innerWidth;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider" + rowId);
    slider.scrollLeft = slider.scrollLeft + window.innerWidth;
    if (
      slider.scrollWidth - window.innerWidth - slider.scrollLeft <=
      window.innerWidth
    )
      fetchPelis();
  };

  return (
    <div>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideLeft}
          size={40}
          className="bg-white text-black rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
        />
        <div
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
          id={"slider" + rowId}
        >
          {movies.map((movie, id) => {
            return <Movie key={id} movie={movie} />;
          })}
        </div>
        <MdChevronRight
          onClick={slideRight}
          size={40}
          className="right-0 bg-white text-black rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
        />
      </div>
    </div>
  );
};

export default Row;
