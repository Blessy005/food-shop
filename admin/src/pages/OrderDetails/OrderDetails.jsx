import { useEffect, useState } from "react";

import { io } from "socket.io-client";

import { useNavigate, useParams } from "react-router-dom";

import "./OrderDetails.css";

function OrderDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [order, setOrder] = useState(null);

  const [status, setStatus] = useState("");

  const [paymentStatus, setPaymentStatus] = useState("");

  const [deliveryPartners, setDeliveryPartners] = useState([]);

  const [selectedDeliveryPartner, setSelectedDeliveryPartner] = useState("");

  const [loading, setLoading] = useState(true);

  const [updating, setUpdating] = useState(false);

  const [assigning, setAssigning] = useState(false);

  const [error, setError] = useState("");

  // =============================
  // FETCH ORDER
  // =============================

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
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch order.");
        }

        setOrder(data);
        setStatus(data.status);
        setPaymentStatus(data.paymentStatus);

        // Set currently assigned delivery partner
        setSelectedDeliveryPartner(data.deliveryPartner?._id || "");
      } catch (err) {
        console.error("Fetch Order Error:", err);

        setError(err.message || "Unable to load order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  // =============================
  // REAL-TIME ORDER UPDATES
  // =============================

  useEffect(() => {
    const socket = io(
      import.meta.env.VITE_API_URL.replace("/api", ""),
    );

    // Delivery status update
    socket.on("orderStatusUpdated", (updatedOrder) => {
      if (String(updatedOrder._id) !== String(id)) {
        return;
      }

      setOrder(updatedOrder);
      setStatus(updatedOrder.status);
    });

    // Payment status update
    socket.on("orderPaymentStatusUpdated", (updatedOrder) => {
      if (String(updatedOrder._id) !== String(id)) {
        return;
      }

      setOrder(updatedOrder);
      setPaymentStatus(updatedOrder.paymentStatus);
    });

    // Delivery availability update
    socket.on("deliveryAvailabilityUpdated", (updatedUser) => {
      if (updatedUser.role !== "delivery") {
        return;
      }

      setDeliveryPartners((currentPartners) =>
        currentPartners.map((partner) =>
          String(partner._id) === String(updatedUser._id)
            ? updatedUser
            : partner,
        ),
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [id]);

  // =============================
  // FETCH DELIVERY PARTNERS
  // =============================

  useEffect(() => {
    const fetchDeliveryPartners = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch delivery partners.",
          );
        }

        // Only show users with delivery role
        const deliveryUsers = data.filter(
          (user) => user.role === "delivery",
        );

        setDeliveryPartners(deliveryUsers);
      } catch (err) {
        console.error("Fetch Delivery Partners Error:", err);
      }
    };

    fetchDeliveryPartners();
  }, []);

  // =============================
  // ASSIGN DELIVERY PARTNER
  // =============================

  const handleAssignDeliveryPartner = async () => {
    try {
      setAssigning(true);

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
            deliveryPartner: selectedDeliveryPartner || null,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to assign delivery partner.",
        );
      }

      setOrder(data.order);

      setSelectedDeliveryPartner(
        data.order.deliveryPartner?._id || "",
      );

      alert(
        selectedDeliveryPartner
          ? "Delivery partner assigned successfully."
          : "Delivery partner removed successfully.",
      );
    } catch (err) {
      console.error("Assign Delivery Partner Error:", err);

      alert(
        err.message ||
          "Something went wrong while assigning the delivery partner.",
      );
    } finally {
      setAssigning(false);
    }
  };

  // =============================
  // UPDATE ORDER STATUS
  // =============================

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
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update order status.",
        );
      }

      setOrder(data.order);
      setStatus(data.order.status);

      alert("Order status updated successfully.");
    } catch (err) {
      console.error("Update Order Error:", err);

      alert(
        err.message || "Something went wrong while updating the order.",
      );
    } finally {
      setUpdating(false);
    }
  };

  // =============================
  // UPDATE PAYMENT STATUS
  // =============================

  const handleUpdatePaymentStatus = async () => {
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
            paymentStatus,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update payment status.",
        );
      }

      setOrder(data.order);
      setPaymentStatus(data.order.paymentStatus);

      alert("Payment status updated successfully.");
    } catch (err) {
      console.error("Update Payment Status Error:", err);

      alert(
        err.message ||
          "Something went wrong while updating payment status.",
      );
    } finally {
      setUpdating(false);
    }
  };

  // =============================
  // LOADING
  // =============================

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

  // =============================
  // ERROR
  // =============================

  if (error || !order) {
    return (
      <div className="order-details-page">
        <div className="order-details-header">
          <div>
            <p className="order-details-back">
              Orders / Order Details
            </p>

            <h1>Order Details</h1>

            <p>{error || "Order not found."}</p>
          </div>
        </div>

        <div className="order-details-card">
          <p>{error || "Order not found."}</p>

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
    ? new Date(order.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "N/A";

  return (
    <div className="order-details-page">
      {/* Page Header */}

      <div className="order-details-header">
        <div>
          <p className="order-details-back">
            Orders / Order Details
          </p>

          <h1>Order #{order.orderNumber}</h1>

          <p>Placed on {formattedDate}</p>
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
                  ? customer.name.charAt(0).toUpperCase()
                  : "?"}
              </div>

              <div className="customer-info">
                <h3>
                  {customer.name || "Unknown Customer"}
                </h3>

                <p>
                  {customer.email || "No email available"}
                </p>

                <p>
                  {order.deliveryDetails?.phone ||
                    "No phone available"}
                </p>
              </div>
            </div>
          </section>

          {/* Delivery Details */}

          <section className="order-details-card">
            <div className="order-card-header">
              <h2>Delivery Details</h2>
            </div>

            <div className="delivery-details-info">
              <div className="delivery-detail-row">
                <span>Name</span>

                <strong>
                  {order.deliveryDetails?.name || "N/A"}
                </strong>
              </div>

              <div className="delivery-detail-row">
                <span>Phone</span>

                <strong>
                  {order.deliveryDetails?.phone || "N/A"}
                </strong>
              </div>

              <div className="delivery-detail-row">
                <span>Address</span>

                <strong>
                  {order.deliveryDetails?.address || "N/A"}
                </strong>
              </div>

              {order.deliveryDetails?.specialInstructions && (
                <div className="delivery-detail-row">
                  <span>Special Instructions</span>

                  <strong>
                    {order.deliveryDetails.specialInstructions}
                  </strong>
                </div>
              )}
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
                <div className="order-item" key={index}>
                  <div className="order-item-image">
                    {item.product?.image ? (
                      <img
                        src={
                          item.product.image.startsWith(
                            "/uploads",
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
                      ₹{item.price} × {item.quantity}
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
          {/* Delivery Partner */}

          <section className="order-details-card">
            <div className="order-card-header">
              <h2>Delivery Partner</h2>
            </div>

            <div className="status-form">
              <label htmlFor="delivery-partner">
                Assign Delivery Partner
              </label>

              <select
                id="delivery-partner"
                value={selectedDeliveryPartner}
                onChange={(e) =>
                  setSelectedDeliveryPartner(e.target.value)
                }
              >
                <option value="">
                  No Delivery Partner
                </option>

                {deliveryPartners.map((partner) => (
                  <option
                    key={partner._id}
                    value={partner._id}
                    disabled={!partner.isAvailable}
                  >
                    {partner.name} — {partner.email} —{" "}
                    {partner.isAvailable
                      ? "Available"
                      : "Unavailable"}
                  </option>
                ))}
              </select>

              <button
                type="button"
                className="update-status-button"
                onClick={handleAssignDeliveryPartner}
                disabled={assigning}
              >
                {assigning
                  ? "Assigning..."
                  : "Assign Delivery Partner"}
              </button>
            </div>
          </section>

          {/* Payment Summary */}

          <section className="order-details-card">
            <div className="order-card-header">
              <h2>Payment Summary</h2>
            </div>

            <div className="payment-summary">
              <div>
                <span>Subtotal</span>

                <strong>₹{order.subtotal}</strong>
              </div>

              <div>
                <span>Delivery Fee</span>

                <strong>₹{order.deliveryFee}</strong>
              </div>

              <div className="payment-total">
                <span>Total</span>

                <strong>₹{order.total}</strong>
              </div>
            </div>

            {/* Payment Status - View Only */}

            <div className="payment-method">
              <span>Payment Status</span>

              <span
                className={`payment-status-badge payment-${paymentStatus.toLowerCase()}`}
              >
                {paymentStatus}
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

              {status === "Out for Delivery" ||
              status === "Delivered" ? (
                <div
                  className="payment-status-badge"
                  style={{
                    background:
                      status === "Delivered"
                        ? "rgba(40, 167, 69, 0.12)"
                        : "rgba(255, 193, 7, 0.15)",
                    color:
                      status === "Delivered"
                        ? "#218838"
                        : "#b78103",
                  }}
                >
                  {status}
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;