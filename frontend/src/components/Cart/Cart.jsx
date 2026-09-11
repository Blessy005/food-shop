import "./Cart.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart({
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}) {
  const navigate = useNavigate();

  // ========================================
  // COUPON STATE
  // ========================================

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  // ========================================
  // CALCULATE SUBTOTAL
  // ========================================

  const subtotal = cart.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0,
  );

  // ========================================
  // DELIVERY FEE
  // ========================================

  const deliveryFee = cart.length > 0 ? 50 : 0;

  // ========================================
  // APPLY COUPON
  // ========================================

  const handleApplyCoupon = async () => {
    setCouponMessage("");
    setCouponError("");

    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code.");
      return;
    }

    if (cart.length === 0) {
      setCouponError("Your cart is empty.");
      return;
    }

    try {
      setCouponLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/coupons/apply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: couponCode.trim(),
            subtotal,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setAppliedCoupon(null);
        setDiscount(0);
        setCouponError(
          data.message || "Failed to apply coupon.",
        );
        return;
      }

      setAppliedCoupon(data.coupon);
      setDiscount(Number(data.discount) || 0);

      setCouponMessage(
        `${data.coupon.code} applied successfully.`,
      );
    } catch (error) {
      console.error("Apply Coupon Error:", error);

      setAppliedCoupon(null);
      setDiscount(0);

      setCouponError(
        "Unable to apply coupon. Please try again.",
      );
    } finally {
      setCouponLoading(false);
    }
  };

  // ========================================
  // REMOVE COUPON
  // ========================================

  const handleRemoveCoupon = () => {
    setCouponCode("");
    setAppliedCoupon(null);
    setDiscount(0);
    setCouponMessage("");
    setCouponError("");
  };

  // ========================================
  // FINAL TOTAL
  // ========================================

  const total = subtotal - discount + deliveryFee;

  return (
    <section className="cart" id="cart">
      <div className="container">
        <div className="section-title">
          <h2>Your Cart</h2>
          <p>Review the items you have selected.</p>
        </div>

        {cart.length === 0 ? (
          <p className="empty-cart">
            Your cart is empty.
          </p>
        ) : (
          <>
            {/* ========================================
                CART ITEMS
            ======================================== */}

            <div className="cart-items">
              {cart.map((item) => (
                <div
                  className="cart-item"
                  key={item.id}
                >
                  {/* Food Image */}

                  <div className="cart-item-image">
                    <img
                      src={item.image}
                      alt={item.name}
                      onError={(e) => {
                        e.currentTarget.style.visibility =
                          "hidden";
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
                    <button
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                    >
                      +
                    </button>

                    <button
                      className="remove-btn"
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ========================================
                COUPON SECTION
            ======================================== */}

            <div className="coupon-section">
              <div className="coupon-title">
                <strong>Have a coupon?</strong>
              </div>

              {!appliedCoupon ? (
                <div className="coupon-input-row">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(
                        e.target.value.toUpperCase(),
                      );
                      setCouponMessage("");
                      setCouponError("");
                    }}
                  />

                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={couponLoading}
                  >
                    {couponLoading
                      ? "Applying..."
                      : "Apply"}
                  </button>
                </div>
              ) : (
                <div className="coupon-applied">
                  <span>
                    ✓ {appliedCoupon.code} applied
                  </span>

                  <button
                    type="button"
                    onClick={handleRemoveCoupon}
                  >
                    Remove
                  </button>
                </div>
              )}

              {couponMessage && (
                <p className="coupon-success">
                  ✓ {couponMessage}
                </p>
              )}

              {couponError && (
                <p className="coupon-error">
                  {couponError}
                </p>
              )}
            </div>

            {/* ========================================
                CART SUMMARY
            ======================================== */}

            <div className="cart-summary">
              <div>
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              {discount > 0 && (
                <div>
                  <span>Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}

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
                onClick={() =>
                  navigate("/checkout", {
                    state: {
                      couponCode:
                        appliedCoupon?.code || null,
                      discount,
                    },
                  })
                }
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