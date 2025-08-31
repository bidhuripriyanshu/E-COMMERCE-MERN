import { FaHeart, FaStar, FaShoppingCart } from "react-icons/fa";
import { useState } from "react";

type ProductsProps = {
    productId: string;
    photo: string;
    name: string;
    price: number;
    stock: number;
    handler: () => void;
    rating?: number;
    reviews?: number;
};

const ProductCard = ({
    productId,
    price,
    name,
    photo,
    stock,
    handler,
    rating = 4.5,
    reviews = 0
}: ProductsProps) => {
    const [isWishlisted, setIsWishlisted] = useState(false);

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsWishlisted(!isWishlisted);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        handler();
    };

    return (
        <div className="product-card-modern">
            <div className="product-image">
                <img src={photo} alt={name} />
                <div className="product-overlay">
                    <button 
                        className={`overlay-btn wishlist-btn ${isWishlisted ? 'active' : ''}`}
                        onClick={handleWishlist}
                    >
                        <FaHeart />
                    </button>
                    <button className="overlay-btn cart-btn" onClick={handleAddToCart}>
                        <FaShoppingCart />
                    </button>
                </div>
                {stock < 10 && stock > 0 && (
                    <span className="stock-badge">Low Stock</span>
                )}
                {stock === 0 && (
                    <span className="stock-badge out-of-stock">Out of Stock</span>
                )}
            </div>
            
            <div className="product-info">
                <h3 className="product-name">{name}</h3>
                
                <div className="product-rating">
                    <div className="stars">
                        {[...Array(5)].map((_, i) => (
                            <FaStar 
                                key={i} 
                                className={`star ${i < Math.floor(rating) ? 'filled' : ''}`} 
                            />
                        ))}
                    </div>
                    {reviews > 0 && (
                        <span className="rating-text">({reviews})</span>
                    )}
                </div>
                
                <div className="product-price">
                    <span className="price">₹{price.toLocaleString()}</span>
                    <span className="stock-info">
                        {stock > 0 ? `${stock} in stock` : 'Out of stock'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;