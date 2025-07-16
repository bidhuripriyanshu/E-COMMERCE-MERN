import { VscError } from "react-icons/vsc";
import { useEffect, useState } from "react";
import CartItem from "../components/cart-item.tsx";
// import { Link } from "react-router-dom";

type CartItemType = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
};

const Cart = () => {
  const cartItems: CartItemType[] = [
    {
      productId: "ugfrefbf",
      photo: "https://thesweetsetup.com/wp-content/uploads/2021/11/M1-Pro-MacBook-Pro-9.jpg",
      name: "macbook",
      price: 300,
      quantity: 40,
      stock: 10,
    },
  ];

  const subtotal = 4000;
  const tax = Math.round(subtotal * 0.18);
  const shippingCharges = 200;
  const total = subtotal + tax + shippingCharges;
  const discount = 400;

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

  return (
    <div className="cart">
      <main>
        {cartItems.map((i, idx) => (
          <CartItem key={idx} cartItem={i} />
        ))}
      </main>
      <aside>
        <p>Subtotal : ₹{subtotal}</p>
        <p>Shipping Charges : ₹{shippingCharges}</p>
        <p>Tax: ₹{tax}</p>
        <p>
          Discount : <em>-₹{discount}</em>
        </p>
        <p>
          <b>Total : ₹{total}</b>
        </p>

        <input
          type="text"
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => {
            setCouponCode(e.target.value);
          }}
        />

        {couponCode &&
          (isValidCouponCode ? (
            <span className="green">
              ₹{discount} off using the <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">
              Invalid Coupon <VscError />
            </span>
          ))}
      </aside>
    </div>
  );
};

export default Cart;