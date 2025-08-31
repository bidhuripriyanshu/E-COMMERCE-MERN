import { VscError } from "react-icons/vsc";
import { useEffect, useState } from "react";
import CartItem from "../components/cart-item.tsx";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaShoppingBag } from "react-icons/fa";

type CartItemType = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
};

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([
    {
      productId: "prod1",
      photo: "https://thesweetsetup.com/wp-content/uploads/2021/11/M1-Pro-MacBook-Pro-9.jpg",
      name: "MacBook Pro M1",
      price: 129999,
      quantity: 1,
      stock: 15,
    },
    {
      productId: "prod2",
      photo: "https://m.media-amazon.com/images/I/514T0SvwkHL._SL1500_.jpg",
      name: "Puma Running Shoes",
      price: 2499,
      quantity: 2,
      stock: 45,
    },
    {
      productId: "prod3",
      photo: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      name: "Wireless Headphones",
      price: 3999,
      quantity: 1,
      stock: 32,
    }
  ]);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.18);
  const shippingCharges = subtotal > 5000 ? 0 : 200;
  const discount = 400;
  const total = subtotal + tax + shippingCharges - discount;

  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

  useEffect(() => {
    const timeOutID = setTimeout(() => {
      if (Math.random() > 0.5) setIsValidCouponCode(true);
      else setIsValidCouponCode(false);
    }, 1000);

    return () => {
      clearTimeout(timeOutID);
      setIsValidCouponCode(false);
    };
  }, [couponCode]);

  const incrementHandler = (productId: string) => {
    setCartItems(prev => 
      prev.map(item => 
        item.productId === productId && item.quantity < item.stock
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrementHandler = (productId: string) => {
    setCartItems(prev => 
      prev.map(item => 
        item.productId === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeHandler = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart">
        <main>
          <div className="empty-cart">
            <FaShoppingBag size={80} color="#667eea" />
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/" className="btn-primary">
              Start Shopping
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="cart">
      <main>
        <div className="cart-header">
          <Link to="/" className="back-btn">
            <FaArrowLeft /> Continue Shopping
          </Link>
          <h1>Shopping Cart ({cartItems.length} items)</h1>
        </div>
        
        <div className="cart-items-container">
          {cartItems.map((item, idx) => (
            <CartItem 
              key={idx} 
              cartItem={item}
              incrementHandler={incrementHandler}
              decrementHandler={decrementHandler}
              removeHandler={removeHandler}
            />
          ))}
        </div>
      </main>
      
      <aside>
        <div className="order-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-item">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>
          
          <div className="summary-item">
            <span>Shipping Charges</span>
            <span>{shippingCharges === 0 ? 'Free' : `₹${shippingCharges}`}</span>
          </div>
          
          <div className="summary-item">
            <span>Tax (18%)</span>
            <span>₹{tax.toLocaleString()}</span>
          </div>
          
          <div className="summary-item">
            <span>Discount</span>
            <span className="discount">-₹{discount.toLocaleString()}</span>
          </div>
          
          <div className="summary-item total">
            <span>Total</span>
            <span>₹{total.toLocaleString()}</span>
          </div>

          <div className="coupon-section">
            <h3>Have a coupon?</h3>
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            {couponCode && (
              <button>
                {isValidCouponCode ? 'Apply Coupon' : 'Invalid Code'}
              </button>
            )}
            
            {couponCode && (
              isValidCouponCode ? (
                <span className="green">
                  ₹{discount} off using <code>{couponCode}</code>
                </span>
              ) : (
                <span className="red">
                  Invalid Coupon <VscError />
                </span>
              )
            )}
          </div>

          <Link to="/shipping" className="checkout-btn">
            Proceed to Checkout
          </Link>
          
          <Link to="/" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </aside>
    </div>
  );
};

export default Cart;