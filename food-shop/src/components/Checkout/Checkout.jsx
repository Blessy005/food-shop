import "./Checkout.css";
import { useNavigate } from "react-router-dom";

function Checkout({ cart, clearCart }) {
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0,
  );

  const deliveryFee = cart.length > 0 ? 50 : 0;

  const total = subtotal + deliveryFee;

  const handleSubmit = (e) => {
    e.preventDefault();

    clearCart();
    navigate("/order-placed");
  };

  return (
    <section className="checkout">
      <div className="container">

        <div className="section-title">
          <h2>Checkout</h2>
          <p>Enter your details to place your order.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="checkout-content">

            {/* Customer Details */}
            <div className="checkout-form">
              <h3>Delivery Details</h3>

              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className="form-group">
                <label>Address</label>
                <textarea
                  placeholder="Enter your delivery address"
                  rows="4"
                  required
                ></textarea>
              </div>
            </div>

            {/* Order Summary */}
            <div className="checkout-summary">
              <h3>Order Summary</h3>

              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <>
                  {cart.map((item) => (
                    <div className="checkout-item" key={item.id}>
                      <span>
                        {item.name} × {item.quantity}
                      </span>

                      <span>
                        ₹{Number(item.price) * item.quantity}
                      </span>
                    </div>
                  ))}

                  <div className="summary-line">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>

                  <div className="summary-line">
                    <span>Delivery Fee</span>
                    <span>₹{deliveryFee}</span>
                  </div>

                  <div className="summary-total">
                    <strong>Total</strong>
                    <strong>₹{total}</strong>
                  </div>

                  <button
                    type="submit"
                    className="place-order-btn"
                  >
                    Place Order
                  </button>
                </>
              )}
            </div>

          </div>
        </form>

      </div>
    </section>
  );
}

export default Checkout;