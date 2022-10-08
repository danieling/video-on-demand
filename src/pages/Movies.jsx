import React, { useRef, useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Movie2 from "../components/Movie2";
import { traerCatalogo } from "../core/Traidor";

const Movies = () => {
  const [catalogo, setCatalogo] = useState([]);
  const targetRef = useRef(null);

  function fetchCatalogo() {
    Promise.resolve(traerCatalogo()).then((arrList) => {
      arrList.forEach((peli) => {
        setCatalogo((prev) => [...prev, peli]);
      });
    });
  }

  const callbackF = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) fetchCatalogo();
  };

  const options = useMemo(() => {
    return {
      threshold: 0.3,
    };
  }, []);

  useEffect(() => {
    if (catalogo.length === 0) fetchCatalogo();
    const observer = new IntersectionObserver(callbackF, options);
    const currentTarget = targetRef.current;
    setTimeout(() => {
      if (currentTarget) observer.observe(currentTarget);
    }, 1700);
    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, []);

  return (
    <div className="mt-36 mb-10 ml-10 mr-10 ">
      <Helmet>
        <title>Catálogo de Películas | Online Latino</title>
        <link rel="canonical" href="/pelis" />
        <meta
          name="description"
          content="Todo el catalogo de Películas que hay en el portal en orden alfabetico."
        />
      </Helmet>
      <div className="flex flex-wrap mt-8 justify-center">
        {catalogo?.map((movie, id) => (
          <Movie2 key={id} movie={movie.data()} />
        ))}
        <section className="mt-10" ref={targetRef}></section>
      </div>
    </div>
  );
};

export default Movies;
