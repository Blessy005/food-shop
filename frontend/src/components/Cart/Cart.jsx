import "./Cart.css";
import { useNavigate } from "react-router-dom";

function Cart({ cart, increaseQuantity, decreaseQuantity, removeFromCart }) {
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0,
  );

  const deliveryFee = cart.length > 0 ? 50 : 0;

  const total = subtotal + deliveryFee;

  return (
    <section className="cart" id="cart">
      <div className="container">
        <div className="section-title">
          <h2>Your Cart</h2>
          <p>Review the items you have selected.</p>
        </div>

        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  {/* Food Image */}
                  <div className="cart-item-image">
                    <img
                      src={item.image}
                      alt={item.name}
                      onError={(e) => {
                        e.currentTarget.style.visibility = "hidden";
                      }}
                    />
                  </div>

                  {/* Food Details */}
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p>{item.category}</p>
                    <span>₹{item.price}</span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="cart-controls">
                    <button onClick={() => decreaseQuantity(item.id)}>−</button>

                    <span>{item.quantity}</span>

                    <button onClick={() => increaseQuantity(item.id)}>+</button>

                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div>
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div>
                <span>Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>

              <div className="cart-total">
                <strong>Total</strong>
                <strong>₹{total}</strong>
              </div>

              <button
                className="checkout-btn"
                onClick={() => navigate("/checkout")}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Cart;
