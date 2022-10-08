import React, { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Movie from "../components/Movie";
import { traerPorTitulo } from "../core/Traidor";

const SearchPage = () => {
  const [pelis, setPelis] = useState([]);
  const [titulo, setTitulo] = useState("");

  const buscar = () => {
    Promise.resolve(traerPorTitulo(titulo.toLowerCase())).then((arrList) => {
      setPelis(arrList);
    });
  };

  useEffect(() => {
    if (titulo.length > 2) buscar();
    else setPelis([]);
  }, [titulo]);

  return (
    <div className="mt-36 mb-10 ml-10 mr-10 ">
      <Helmet>
        <title>Buscador de Películas y Series</title>
        <link rel="canonical" href="/buscar" />
        <meta
          name="description"
          content="buscador de películas y Series que hay en el sitio https://www.peliculiar.click"
        />
      </Helmet>
      <div className="flex items-center">
        <div className="relative w-full">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            onChange={(e) => setTitulo(e.target.value)}
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Qué te gustaría ver?"
            required
          />
        </div>
      </div>
      <div className="flex flex-wrap mt-8 justify-center">
        {pelis?.length ? (
          pelis.map((movie, id) => <Movie key={id} movie={movie} />)
        ) : (
          <p className={titulo.length < 3 ? "hidden" : "text-red-800"}>
            Por el momento no tenemos ese video, intenta otro titulo!
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
