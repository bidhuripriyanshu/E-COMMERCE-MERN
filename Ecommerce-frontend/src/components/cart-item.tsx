import { Link } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus, FaHeart } from 'react-icons/fa';

type CartItemType = {
    productId: string;
    photo: string;
    name: string;
    price: number;
    quantity: number;
    stock: number;
};

type CartItemProps = {
    cartItem: CartItemType;
    incrementHandler: (productId: string) => void;
    decrementHandler: (productId: string) => void;
    removeHandler: (productId: string) => void;
};

const CartItem = ({ 
    cartItem, 
    incrementHandler, 
    decrementHandler, 
    removeHandler 
}: CartItemProps) => {
    const { photo, productId, name, price, quantity, stock } = cartItem;

    const handleIncrement = () => {
        if (quantity < stock) {
            incrementHandler(productId);
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            decrementHandler(productId);
        }
    };

    const handleRemove = () => {
        removeHandler(productId);
    };

    return (
        <div className="cart-item-modern">
            <div className="cart-item-image">
                <img src={photo} alt={name} />
                <button className="wishlist-btn">
                    <FaHeart />
                </button>
            </div>
            
            <div className="cart-item-details">
                <Link to={`/product/${productId}`} className="product-name">
                    {name}
                </Link>
                <div className="product-price">
                    <span className="price">₹{price.toLocaleString()}</span>
                    <span className="total-price">Total: ₹{(price * quantity).toLocaleString()}</span>
                </div>
                <div className="stock-info">
                    <span className={`stock-status ${stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                        {stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                    {stock > 0 && stock < 10 && (
                        <span className="low-stock">Only {stock} left!</span>
                    )}
                </div>
            </div>

            <div className="cart-item-actions">
                <div className="quantity-controls">
                    <button 
                        className="quantity-btn" 
                        onClick={handleDecrement}
                        disabled={quantity <= 1}
                    >
                        <FaMinus />
                    </button>
                    <span className="quantity">{quantity}</span>
                    <button 
                        className="quantity-btn" 
                        onClick={handleIncrement}
                        disabled={quantity >= stock}
                    >
                        <FaPlus />
                    </button>
                </div>
                
                <button className="remove-btn" onClick={handleRemove}>
                    <FaTrash />
                    <span>Remove</span>
                </button>
            </div>
        </div>
    );
};

export default CartItem;