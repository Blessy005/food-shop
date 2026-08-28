import "./Checkout.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Checkout({ cart, clearCart }) {
  const navigate = useNavigate();

  // Delivery details
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    specialInstructions: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Calculate order amounts
  const subtotal = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0,
  );

  const deliveryFee = cart.length > 0 ? 50 : 0;
  const total = subtotal + deliveryFee;

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Create order through backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Get customer token
    const token = localStorage.getItem("customerToken");

    // Customer must be logged in
    if (!token) {
      navigate("/login");
      return;
    }

    // Prevent empty orders
    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);

      // Prepare cart items
      const orderItems = cart.map((item) => ({
        product: item.id,
        name: item.name,
        price: Number(item.price),
        quantity: item.quantity,
      }));

      // Send order to backend
      const response = await fetch(
        "http://localhost:5000/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            items: orderItems,
            subtotal,
            deliveryFee,
            total,
            paymentStatus: "Pending",

            // Delivery details
            name: formData.name,
            phone: formData.phone,
            address: formData.address,
            specialInstructions: formData.specialInstructions,
          }),
        },
      );

      const data = await response.json();

      // Handle API errors
      if (!response.ok) {
        throw new Error(
          data.message || "Failed to place order.",
        );
      }

      // Save latest order
      localStorage.setItem(
        "lastOrder",
        JSON.stringify(data.order),
      );

      // Clear cart after successful order
      clearCart();

      // Navigate to confirmation
      navigate("/order-placed");
    } catch (error) {
      console.error("Place Order Error:", error);

      setError(
        error.message ||
          "Something went wrong while placing your order.",
      );
    } finally {
      setLoading(false);
    }
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

              {/* Name */}
              <div className="form-group">
                <label htmlFor="name">
                  Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Phone */}
              <div className="form-group">
                <label htmlFor="phone">
                  Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Address */}
              <div className="form-group">
                <label htmlFor="address">
                  Address
                </label>

                <textarea
                  id="address"
                  name="address"
                  placeholder="Enter your delivery address"
                  rows="4"
                  value={formData.address}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {/* Special Instructions */}
              <div className="form-group">
                <label htmlFor="specialInstructions">
                  Special Instructions
                </label>

                <textarea
                  id="specialInstructions"
                  name="specialInstructions"
                  placeholder="Any special requests? e.g. less spicy, no onions..."
                  rows="4"
                  value={formData.specialInstructions}
                  onChange={handleChange}
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
                  {/* Cart Items */}
                  {cart.map((item) => (
                    <div
                      className="checkout-item"
                      key={item.id}
                    >
                      <span>
                        {item.name} × {item.quantity}
                      </span>

                      <span>
                        ₹{Number(item.price) * item.quantity}
                      </span>
                    </div>
                  ))}

                  {/* Subtotal */}
                  <div className="summary-line">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>

                  {/* Delivery Fee */}
                  <div className="summary-line">
                    <span>Delivery Fee</span>
                    <span>₹{deliveryFee}</span>
                  </div>

                  {/* Total */}
                  <div className="summary-total">
                    <strong>Total</strong>
                    <strong>₹{total}</strong>
                  </div>

                  {/* Error */}
                  {error && (
                    <p className="checkout-error">
                      {error}
                    </p>
                  )}

                  {/* Place Order */}
                  <button
                    type="submit"
                    className="place-order-btn"
                    disabled={loading}
                  >
                    {loading
                      ? "Placing Order..."
                      : "Place Order"}
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