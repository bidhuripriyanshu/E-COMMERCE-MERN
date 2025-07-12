
import {Link} from 'react-router-dom';
import ProductCart from './product-cart';
const Home = () => {
   return(
      <div className="home">
      <section></section>

      <h1>Latest products
      <Link to ='/search' className='findmore'> More</Link>
      </h1>

      <main>
        <ProductCart
        productId="beffferu"
        name="Puma shoes"
        price={496832}
        stock={8348}
        handler={() => console.log("Add to cart")}
        photo="https://m.media-amazon.com/images/I/514T0SvwkHL._SL1500_.jpg"
        />

      </main>
      </div>


   )                                                                                  
};

export default Home