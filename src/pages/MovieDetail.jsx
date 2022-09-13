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
    <div>
      <div className="grid place-items-center">
        <h2 className="text-green-50 text-3xl py-40">
          {peli ? peli.title : movieParam?.title}
        </h2>
        <iframe
          src={`https://sbspeed.com/e/${
            peli ? peli.video : movieParam?.video
          }.html`}
          width="640"
          height="360"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default MovieDetail;
