import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./OrderDetails.css";

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  // Fetch single order from MongoDB
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("adminToken");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/orders/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch order."
          );
        }

        setOrder(data);
        setStatus(data.status);
      } catch (err) {
        console.error("Fetch Order Error:", err);
        setError(
          err.message || "Unable to load order details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  // Update order status
  const handleUpdateStatus = async () => {
    try {
      setUpdating(true);

      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/orders/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update order status."
        );
      }

      setOrder(data.order);
      setStatus(data.order.status);

      alert("Order status updated successfully.");
    } catch (err) {
      console.error("Update Order Error:", err);
      alert(
        err.message ||
          "Something went wrong while updating the order."
      );
    } finally {
      setUpdating(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="order-details-page">
        <div className="order-details-header">
          <div>
            <p className="order-details-back">
              Orders / Order Details
            </p>

            <h1>Order Details</h1>

            <p>Loading order information...</p>
          </div>
        </div>

        <div className="order-details-card">
          <p>Loading order...</p>
        </div>
      </div>
    );
  }

  // Error
  if (error || !order) {
    return (
      <div className="order-details-page">
        <div className="order-details-header">
          <div>
            <p className="order-details-back">
              Orders / Order Details
            </p>

            <h1>Order Details</h1>

            <p>
              {error || "Order not found."}
            </p>
          </div>
        </div>

        <div className="order-details-card">
          <p>
            {error || "Order not found."}
          </p>

          <button
            type="button"
            className="update-status-button"
            onClick={() => navigate("/admin/orders")}
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const customer = order.customer || {};

  const formattedDate = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      )
    : "N/A";

  return (
    <div className="order-details-page">
      {/* Page Header */}
      <div className="order-details-header">
        <div>
          <p className="order-details-back">
            Orders / Order Details
          </p>

          <h1>
            Order #{order.orderNumber}
          </h1>

          <p>
            Placed on {formattedDate}
          </p>
        </div>

        <span className="order-details-status">
          {order.status}
        </span>
      </div>

      {/* Main Content */}
      <div className="order-details-layout">

        {/* Left Section */}
        <div className="order-details-main">

          {/* Customer */}
          <section className="order-details-card">
            <div className="order-card-header">
              <h2>Customer</h2>
            </div>

            <div className="customer-details">
              <div className="customer-avatar">
                {customer.name
                  ? customer.name
                      .charAt(0)
                      .toUpperCase()
                  : "?"}
              </div>

              <div className="customer-info">
                <h3>
                  {customer.name ||
                    "Unknown Customer"}
                </h3>

                <p>
                  {customer.email ||
                    "No email available"}
                </p>

                <p>
                  {customer.phone ||
                    "No phone available"}
                </p>
              </div>
            </div>
          </section>

          {/* Items */}
          <section className="order-details-card">
            <div className="order-card-header">
              <h2>Items</h2>

              <span>
                {order.items?.length || 0} products
              </span>
            </div>

            <div className="order-items-list">
              {order.items?.map((item, index) => (
                <div
                  className="order-item"
                  key={index}
                >
                  <div className="order-item-image">
                    {item.product?.image ? (
                      <img
                        src={
                          item.product.image.startsWith(
                            "/uploads"
                          )
                            ? `${import.meta.env.VITE_SERVER_URL}${item.product.image}`
                            : item.product.image
                        }
                        alt={
                          item.name ||
                          item.product.name
                        }
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    ) : (
                      "🍴"
                    )}
                  </div>

                  <div className="order-item-info">
                    <h3>
                      {item.name ||
                        item.product?.name ||
                        "Unknown Product"}
                    </h3>

                    <p>
                      ₹{item.price} ×{" "}
                      {item.quantity}
                    </p>
                  </div>

                  <strong>
                    ₹
                    {Number(item.price) *
                      Number(item.quantity)}
                  </strong>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Section */}
        <div className="order-details-sidebar">

          {/* Payment Summary */}
          <section className="order-details-card">
            <div className="order-card-header">
              <h2>Payment Summary</h2>
            </div>

            <div className="payment-summary">
              <div>
                <span>Subtotal</span>

                <strong>
                  ₹{order.subtotal}
                </strong>
              </div>

              <div>
                <span>Delivery Fee</span>

                <strong>
                  ₹{order.deliveryFee}
                </strong>
              </div>

              <div className="payment-total">
                <span>Total</span>

                <strong>
                  ₹{order.total}
                </strong>
              </div>
            </div>

            <div className="payment-method">
              <span>Payment Status</span>

              <span
                className={
                  order.paymentStatus === "Paid"
                    ? "payment-paid"
                    : "payment-paid"
                }
              >
                {order.paymentStatus}
              </span>
            </div>
          </section>

          {/* Order Status */}
          <section className="order-details-card">
            <div className="order-card-header">
              <h2>Order Status</h2>
            </div>

            <div className="status-form">
              <label htmlFor="order-status">
                Current Status
              </label>

              <select
                id="order-status"
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
              >
                <option value="Pending">
                  Pending
                </option>

                <option value="Confirmed">
                  Confirmed
                </option>

                <option value="Preparing">
                  Preparing
                </option>

                <option value="Out for Delivery">
                  Out for Delivery
                </option>

                <option value="Delivered">
                  Delivered
                </option>

                <option value="Cancelled">
                  Cancelled
                </option>
              </select>

              <button
                type="button"
                className="update-status-button"
                onClick={handleUpdateStatus}
                disabled={updating}
              >
                {updating
                  ? "Updating..."
                  : "Update Status"}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;