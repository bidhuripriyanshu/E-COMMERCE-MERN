import { useState, useMemo, useEffect } from "react";
import ProductCard from "../components/product-card";
import Header from "../components/header";
import { FaRedo, FaBoxOpen, FaFilter } from "react-icons/fa";

const sampleProducts = [
  {
    productId: "prod1",
    name: "MacBook Pro M1",
    photo: "https://thesweetsetup.com/wp-content/uploads/2021/11/M1-Pro-MacBook-Pro-9.jpg",
    price: 129999,
    stock: 15,
    category: "Electronics",
  },
  {
    productId: "prod2",
    name: "Puma Running Shoes",
    photo: "https://m.media-amazon.com/images/I/514T0SvwkHL._SL1500_.jpg",
    price: 2499,
    stock: 45,
    category: "Fashion",
  },
  {
    productId: "prod3",
    name: "Wireless Headphones",
    photo: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    price: 3999,
    stock: 32,
    category: "Electronics",
  },
  {
    productId: "prod4",
    name: "Smart Watch",
    photo: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    price: 15999,
    stock: 8,
    category: "Electronics",
  },
  {
    productId: "prod5",
    name: "Classic Novel",
    photo: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
    price: 499,
    stock: 100,
    category: "Books",
  },
  {
    productId: "prod6",
    name: "Garden Tools Set",
    photo: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=500",
    price: 1299,
    stock: 20,
    category: "Home & Garden",
  },
  {
    productId: "prod7",
    name: "Football",
    photo: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=500",
    price: 799,
    stock: 50,
    category: "Sports",
  },
  {
    productId: "prod8",
    name: "Lipstick Set",
    photo: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=500",
    price: 999,
    stock: 30,
    category: "Beauty",
  },
];

const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Sports",
  "Books",
  "Beauty",
];

const PRODUCTS_PER_PAGE = 4;

const Search = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const addToCartHandler = () => {
    // Add to cart functionality will be implemented later
    console.log("Added to cart");
  };

  // Simulate loading state
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, [search, sort, maxPrice, category, page]);

  // Filter, sort, and paginate products
  const filteredProducts = useMemo(() => {
    let products = sampleProducts.filter(
      (p) =>
        p.price <= maxPrice &&
        (category === "All" || p.category === category) &&
        p.name.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === "asc") products = products.sort((a, b) => a.price - b.price);
    if (sort === "dsc") products = products.sort((a, b) => b.price - a.price);
    return products;
  }, [search, sort, maxPrice, category]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  const isPrevPage = page > 1;
  const isNextPage = page < totalPages;

  // Reset to page 1 when filters change
  const handleFilterChange = (setter: any, value: any) => {
    setter(value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setSort("");
    setMaxPrice(100000);
    setCategory("All");
    setPage(1);
  };

  // Responsive: hide filters on mobile
  const handleToggleFilters = () => setShowFilters((prev) => !prev);

  return (
    <>
      <Header />
      <div className="product-search-page">
        {/* Mobile filter toggle */}
        <button className="filter-toggle-btn" onClick={handleToggleFilters}>
          <FaFilter /> Filters
        </button>
        <aside className={showFilters ? "show" : ""}>
          <div className="filters-header">
            <h2>Filters</h2>
            <button className="clear-filters-btn" onClick={clearFilters}>
              <FaRedo /> Clear
            </button>
          </div>
          <div>
            <h4>Sort</h4>
            <div className="sort-options">
              <button
                className={sort === "" ? "active" : ""}
                onClick={() => handleFilterChange(setSort, "")}
              >None</button>
              <button
                className={sort === "asc" ? "active" : ""}
                onClick={() => handleFilterChange(setSort, "asc")}
              >Price (Low to High)</button>
              <button
                className={sort === "dsc" ? "active" : ""}
                onClick={() => handleFilterChange(setSort, "dsc")}
              >Price (High to Low)</button>
            </div>
          </div>

          <div>
            <h4>Max Price: ₹{maxPrice || ""}</h4>
            <input
              type="range"
              min={100}
              max={100000}
              value={maxPrice}
              onChange={(e) => handleFilterChange(setMaxPrice, Number(e.target.value))}
            />
          </div>

          <div>
            <h4>Category</h4>
            <div className="category-chips">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={cat === category ? "active" : ""}
                  onClick={() => handleFilterChange(setCategory, cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main>
          <div className="search-header-bar">
            <h1>Products</h1>
            <span className="product-count">{filteredProducts.length} found</span>
          </div>
          <input
            type="text"
            className="search-input"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => handleFilterChange(setSearch, e.target.value)}
          />

          <div className="search-product-list">
            {loading ? (
              <div className="search-loading">Loading products...</div>
            ) : paginatedProducts.length === 0 ? (
              <div className="no-results">
                <FaBoxOpen size={40} style={{ color: '#667eea', marginBottom: 8 }} />
                <div>No products found.</div>
                <div className="try-another">Try adjusting your filters or search.</div>
              </div>
            ) : (
              paginatedProducts.map((product) => (
                <ProductCard
                  key={product.productId}
                  productId={product.productId}
                  name={product.name}
                  photo={product.photo}
                  price={product.price}
                  stock={product.stock}
                  handler={addToCartHandler}
                />
              ))
            )}
          </div>

          <article className="pagination-bar">
            <button
              disabled={!isPrevPage}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Prev
            </button>
            <span>
              {page} of {totalPages}
            </span>
            <button
              disabled={!isNextPage}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </article>
        </main>
      </div>
    </>
  );
};

export default Search;