import React, { useEffect } from "react";
import { useState } from "react";
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
  }, []);

  return (
    <div className="ml-8 mr-8 mb-10">
      <div className="grid place-items-center">
        <h2 className="text-green-50 text-3xl py-40">
          {peli ? peli.title : movieParam?.title}
        </h2>
        <div className="relative overflow-hidden w-full pt-[56.25%]">
          <iframe
            className="absolute top-0 left-0 bottom-0 right-0 w-full h-full"
            src={`https://sblanh.com/e/${
              peli ? peli.video : movieParam?.video
            }.html`}
            width="640"
            height="360"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
