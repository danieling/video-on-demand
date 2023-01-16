import React, { useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useParams } from "react-router-dom";
import { incrementViewCounter, traerPeliPorId } from "../core/Traidor";

const MovieDetail = () => {
  const { peli } = useLocation().state ? useLocation().state : {};
  const { id } = useParams();
  const [movieParam, setMovieParam] = useState();

  useEffect(() => {
    if (!peli) {
      if (!isNaN(id)) {
        Promise.resolve(traerPeliPorId(id))
          .then((pel) => {
            if (pel) {
              setMovieParam(pel);
              incrementViewCounter(pel.id);
            } else throw Error;
          })
          .catch((err) => {
            alert("No existe el ID: " + id);
          });
      } else {
        alert("ID incorrecto!");
      }
    } else {
      incrementViewCounter(peli?.id);
    }
  }, [id]);

  return (
    <div className="ml-8 mr-8">
      <Helmet>
        <title>Pelicula: {`${peli ? peli.title : movieParam?.title}`}</title>
        <meta
          name="description"
          content={
            peli
              ? peli.overview.substring(0, 169)
              : movieParam?.overview.substring(0, 169)
          }
        />
        <link
          rel="canonical"
          href={`/pelis/${
            peli
              ? peli.title.replaceAll(" ", "-")
              : movieParam?.title.replaceAll(" ", "-")
          }/${peli ? peli.id : movieParam?.id}`}
        />
      </Helmet>
      <div className="grid place-items-center">
        <div className="py-20"></div>
        <h2 className="text-2xl mb-5">
          {`${peli ? peli.title : movieParam?.title}`}
        </h2>
      </div>
      <div className="w-full lg:max-w-full lg:flex">
        <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            <p className="text-gray-700 text-base">
              {`${peli ? peli.overview : movieParam?.overview}`}
            </p>
          </div>
        </div>
      </div>
      <div className="relative overflow-hidden w-full pt-[56.25%]">
        <iframe
          className="absolute top-10 left-0 bottom-10 right-0 w-full h-full"
          src={`https://sblongvu.com/e/${
            peli ? peli.video : movieParam?.video
          }.html`}
          width="1080"
          height="720"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default MovieDetail;
