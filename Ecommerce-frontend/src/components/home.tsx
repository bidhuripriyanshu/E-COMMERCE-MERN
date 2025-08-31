
import { Link } from 'react-router-dom';
import ProductCart from './product-card';

const Home = () => {
  return (
    <div className="home">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Discover the Latest Trends</h1>
          <p>Shop the best products, curated just for you. Enjoy fast shipping and exclusive deals every day.</p>
          <div className="hero-buttons">
            <Link to="/search" className="btn-primary">Shop Now</Link>
            <Link to="/cart" className="btn-secondary">View Cart</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="/src/assets/cover.jpg" alt="E-Commerce Hero" />
        </div>
      </section>
      <div className="section-header">
        <h2>Latest Products</h2>
        <p>Check out our newest arrivals and best sellers.</p>
        <Link to='/search' className='view-all'>View All</Link>
      </div>
      <main className="featured-section">
        <div className="products-grid">
          <ProductCart
            productId="beffferu"
            name="Puma shoes"
            price={496832}
            stock={8348}
            handler={() => console.log("Add to cart")}
            photo="https://m.media-amazon.com/images/I/514T0SvwkHL._SL1500_.jpg"
          />
        </div>
      </main>
    </div>
  )
};

export default Home;