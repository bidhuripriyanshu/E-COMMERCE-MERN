import { Link } from "react-router-dom";
import ProductCard from "../components/product-card.tsx";

const Home = () => {

  const addToCartHandler=()=>{
     
  }
  return (
    <div className="home">
      <section></section>

      <h1>
        Latest Products
        <Link to="/search" className="findmore">
          More
        </Link>
      </h1>
      <main>
        <ProductCard
          productId="bjhfuef"
          name="priyanshu"
          photo="https://thesweetsetup.com/wp-content/uploads/2021/11/M1-Pro-MacBook-Pro-9.jpg"
          price={848}
          stock={849}
          handler={addToCartHandler}
        />
      </main>
    </div>
  );
};

export default Home;
