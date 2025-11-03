import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import "../../style/cart.css";

const CartPage = () => {
  const { cart, dispatch } = useCart();
  const [showPayment, setShowPayment] = useState(false);
  const [success, setSuccess] = useState(false);

  const incrementItem = (product) => dispatch({ type: "INCREMENT_ITEM", payload: product });
  const decrementItem = (product) => {
    const cartItem = cart.find((item) => item.id === product.id);
    if (cartItem && cartItem.quantity > 1)
      dispatch({ type: "DECREMENT_ITEM", payload: product });
    else dispatch({ type: "REMOVE_ITEM", payload: product });
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  if (success) {
    return (
      <div className="payment-success">
        <div className="success-box">
          <h2>✅ Payment Successful!</h2>
          <p>Thank you for your purchase.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="cart-title">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : !showPayment ? (
        <div className="cart-container">
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="item-details">
                  <h2>{item.name}</h2>
                  <p>{item.description}</p>
                  <div className="quantity-controls">
                    <button onClick={() => decrementItem(item)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => incrementItem(item)}>+</button>
                  </div>
                </div>
                <span className="price">Rs. {item.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h2>Total: <span>Rs. {totalPrice.toFixed(2)}</span></h2>
            <button
              className="checkout-button"
              onClick={() => setShowPayment(true)}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      ) : (
        <CheckoutForm totalPrice={totalPrice} setSuccess={setSuccess} />
      )}
    </div>
  );
};

export default CartPage;

// Inline import to avoid circular
const CheckoutForm = ({ totalPrice, setSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handlePay = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  return (
    <div className="checkout-container">
      <h2>Payment Details</h2>
      <form className="checkout-form" onSubmit={handlePay}>
        <div className="input-group">
          <label>Cardholder Name</label>
          <input type="text" placeholder="John Doe" required />
        </div>
        <div className="input-group">
          <label>Card Number</label>
          <input type="text" placeholder="4242 4242 4242 4242" required />
        </div>
        <div className="input-row">
          <div className="input-group">
            <label>Expiry Date</label>
            <input type="text" placeholder="MM/YY" required />
          </div>
          <div className="input-group">
            <label>CVC</label>
            <input type="text" placeholder="123" required />
          </div>
        </div>
        <button type="submit" className="pay-button" disabled={loading}>
          {loading ? "Processing..." : `Pay Rs. ${totalPrice.toFixed(2)}`}
        </button>
      </form>
    </div>
  );
};
