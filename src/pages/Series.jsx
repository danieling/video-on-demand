import React from "react";
import { Helmet } from "react-helmet-async";

const Series = () => {
  return (
    <div className="flex items-center justify-center h-screen text-slate-300">
      <Helmet>
        <title>Catálogo de Series | Online Latino</title>
        <link rel="canonical" href="/series" />
        <meta
          name="description"
          content="Todo el catalogo de Series que hay en el portal en orden alfabetico."
        />
      </Helmet>
      Series
    </div>
  );
};

export default Series;
