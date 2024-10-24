import Container from "../../components/layout/Container";
import { productData } from "../../data";
import Card from "../../components/re-usable/Card";

const Home = () => {
  return (
    <Container className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 py-8">
      {productData.map((item) => (
       <Card key={item.id} item={item} />
      ))}
    </Container>
  );
};

export default Home;
