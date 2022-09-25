import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import Movies from "./pages/Movies";
import MovieDetail from "./pages/MovieDetail";
import Series from "./pages/Series";
import Favorites from "./pages/Favorites";
import { useEffect, useState } from "react";

function App() {
  const [adblock, setAdblock] = useState(false);
  useEffect(() => {
    setTimeout(function () {
      var ad = document.querySelector("ins.adsbygoogle");
      if (!ad) {
        setAdblock(true);
      }
    }, 60000 * 10);
  }, []);

  return adblock ? (
    <div className="App">
      Adblock detectado! Talvez tu navegador tenga por defecto un adblocker o
      estás en una red que bloquea anuncios por DNS Dasactivalos para ver
      peliculas y series de Tv.
    </div>
  ) : (
    <div className="App">
      <Navbar />
      <h1 hidden>
        netflix disney+ star+ paramount+ ViX Prime Video HBO Max America TvGO
        Peliculas online latino
      </h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buscar" element={<SearchPage />} />
        <Route path="/favoritos" element={<Favorites />} />
        <Route path="/pelis" element={<Movies />} />
        <Route path="/pelis/:title/:id" element={<MovieDetail />} />
        <Route path="/series" element={<Series />} />
        <Route path="/series/:title/:id" element={<Series />} />
      </Routes>
    </div>
  );
}

export default App;
