import Feature from "../components/Feature";
import Row from "../components/Row";

const Home = () => {
  return (
    <div>
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
