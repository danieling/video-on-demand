import { Helmet } from "react-helmet-async";
import Feature from "../components/Feature";
import Row from "../components/Row";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>peliculiar.click | online latino</title>
        <meta
          name="description"
          content="En esta página encontraras peliculas y series  de Netflix HboMax Primevideo Disney+ Star+ Paramount+ ViX Plutotv AmericaTv. Cada día se añade mas contenido!"
        />
        <link rel="canonical" href="/" />
      </Helmet>
      <Feature />
      <Row rowId={35} title="Comedias" />
      <Row rowId={16} title="Animación" />
      <Row rowId={10749} title="Romance" />
      <Row rowId={27} title="Terror" />
      <Row rowId={10751} title="En Familia" />
      <Row rowId={28} title="Acción" />
    </div>
  );
};

export default Home;
