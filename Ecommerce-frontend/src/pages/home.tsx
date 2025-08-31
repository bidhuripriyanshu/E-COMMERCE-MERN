import { Link } from "react-router-dom";
import ProductCard from "../components/product-card.tsx";
import { FaArrowRight } from "react-icons/fa";
import Header from "../components/header";

const Home = () => {
  const addToCartHandler = () => {
    // Add to cart functionality will be implemented later
    console.log("Added to cart");
  };

  // Sample featured products data
  const featuredProducts = [
    {
      productId: "prod1",
      name: "MacBook Pro M1",
      photo: "https://thesweetsetup.com/wp-content/uploads/2021/11/M1-Pro-MacBook-Pro-9.jpg",
      price: 129999,
      stock: 15,
      rating: 4.8,
      reviews: 124
    },
    {
      productId: "prod2",
      name: "Puma Running Shoes",
      photo: "https://m.media-amazon.com/images/I/514T0SvwkHL._SL1500_.jpg",
      price: 2499,
      stock: 45,
      rating: 4.5,
      reviews: 89
    },
    {
      productId: "prod3",
      name: "Wireless Headphones",
      photo: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      price: 3999,
      stock: 32,
      rating: 4.7,
      reviews: 156
    },
    {
      productId: "prod4",
      name: "Smart Watch",
      photo: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
      price: 15999,
      stock: 8,
      rating: 4.6,
      reviews: 203
    }
  ];

  const categories = [
    { name: "Electronics", icon: "📱", count: 156 },
    { name: "Fashion", icon: "👕", count: 89 },
    { name: "Home & Garden", icon: "🏠", count: 67 },
    { name: "Sports", icon: "⚽", count: 43 },
    { name: "Books", icon: "📚", count: 234 },
    { name: "Beauty", icon: "💄", count: 78 }
  ];

  return (
    <>
      <Header />
      <div className="home">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1>Discover Amazing Products</h1>
            <p>Shop the latest trends with unbeatable prices and fast delivery</p>
            <div className="hero-buttons">
              <Link to="/search" className="btn-primary">
                Shop Now <FaArrowRight />
              </Link>
              <Link to="/search" className="btn-secondary">
                Browse Categories
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600" alt="Shopping" />
          </div>
        </section>

        {/* Categories Section */}
        <section className="categories-section">
          <div className="section-header">
            <h2>Shop by Category</h2>
            <p>Find what you're looking for in our curated categories</p>
          </div>
          <div className="categories-grid">
            {categories.map((category, index) => (
              <Link key={index} to={`/search?category=${category.name}`} className="category-card">
                <div className="category-icon">{category.icon}</div>
                <h3>{category.name}</h3>
                <p>{category.count} products</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="featured-section">
          <div className="section-header">
            <h2>Featured Products</h2>
            <Link to="/search" className="view-all">
              View All <FaArrowRight />
            </Link>
          </div>
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.productId}
                productId={product.productId}
                name={product.name}
                photo={product.photo}
                price={product.price}
                stock={product.stock}
                handler={addToCartHandler}
                rating={product.rating}
                reviews={product.reviews}
              />
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="newsletter-section">
          <div className="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Subscribe to our newsletter for exclusive deals and updates</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email address" />
              <button className="btn-primary">Subscribe</button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
