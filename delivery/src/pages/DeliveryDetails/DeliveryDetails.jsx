import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import "./DeliveryDetails.css";

function DeliveryDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [updating, setUpdating] = useState(false);

  const [paymentStatus, setPaymentStatus] = useState("Pending");

  const [updatingPayment, setUpdatingPayment] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("deliveryToken");

        if (!token) {
          setError("Please login again.");
          return;
        }

        const response = await fetch(
          `${API_URL}/orders/delivery/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch delivery"
          );
        }

        setOrder(data);
        setPaymentStatus(data.paymentStatus || "Pending");
      } catch (error) {
        console.error("Delivery Details Error:", error);

        setError(
          error.message || "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [API_URL, id]);

  const updateStatus = async (status) => {
    try {
      setUpdating(true);
      setError("");

      const token = localStorage.getItem("deliveryToken");

      if (!token) {
        setError("Please login again.");
        return;
      }

      const response = await fetch(
        `${API_URL}/orders/delivery/${id}/status`,
        {
          method: "PATCH",
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
          data.message || "Failed to update status"
        );
      }

      setOrder(data.order);
    } catch (error) {
      console.error("Status Update Error:", error);

      setError(
        error.message ||
          "Failed to update delivery status."
      );
    } finally {
      setUpdating(false);
    }
  };

  const updatePaymentStatus = async () => {
    try {
      setUpdatingPayment(true);
      setError("");

      const token = localStorage.getItem("deliveryToken");

      if (!token) {
        setError("Please login again.");
        return;
      }

      const response = await fetch(
        `${API_URL}/orders/delivery/${id}/payment`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            paymentStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update payment status"
        );
      }

      setOrder(data.order);
      setPaymentStatus(data.order.paymentStatus);
    } catch (error) {
      console.error(
        "Payment Status Update Error:",
        error
      );

      setError(
        error.message ||
          "Failed to update payment status."
      );
    } finally {
      setUpdatingPayment(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Confirmed":
        return "status-confirmed";

      case "Preparing":
        return "status-preparing";

      case "Out for Delivery":
        return "status-out-for-delivery";

      case "Delivered":
        return "status-delivered";

      case "Pending":
      default:
        return "status-pending";
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <section className="delivery-details-page">
        <div className="delivery-details-container">
          <p>Loading delivery details...</p>
        </div>
      </section>
    );
  }

  if (error || !order) {
    return (
      <section className="delivery-details-page">
        <div className="delivery-details-container">
          <Link
            to="/deliveries"
            className="delivery-back-link"
          >
            ← Back to My Deliveries
          </Link>

          <p>{error || "Delivery not found."}</p>
        </div>
      </section>
    );
  }

  const customerName =
    order.deliveryDetails?.name ||
    order.customer?.name ||
    "N/A";

  const customerInitials = customerName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <section className="delivery-details-page">
      <div className="delivery-details-container">
        {/* Back */}
        <Link
          to="/deliveries"
          className="delivery-back-link"
        >
          ← Back to My Deliveries
        </Link>

        {/* Page Header */}
        <div className="details-header">
          <div>
            <span className="details-label">
              Delivery Details
            </span>

            <h1>#{order.orderNumber}</h1>

            <p>
              View order information and update delivery
              status.
            </p>
          </div>

          <span
            className={`status-badge ${getStatusClass(
              order.status
            )}`}
          >
            {order.status}
          </span>
        </div>

        {/* Error */}
        {error && <p>{error}</p>}

        {/* Main Content */}
        <div className="details-grid">
          {/* Order Information */}
          <div className="details-card">
            <div className="details-card-header">
              <div>
                <h2>Order Information</h2>

                <p>
                  Details about this customer order.
                </p>
              </div>
            </div>

            <div className="order-info-grid">
              <div className="order-info-item">
                <span>Order ID</span>

                <strong>
                  #{order.orderNumber}
                </strong>
              </div>

              <div className="order-info-item">
                <span>Order Date</span>

                <strong>
                  {formatDate(order.createdAt)}
                </strong>
              </div>

              <div className="order-info-item">
                <span>Total Items</span>

                <strong>
                  {order.items?.length || 0}{" "}
                  {order.items?.length === 1
                    ? "item"
                    : "items"}
                </strong>
              </div>

              <div className="order-info-item">
                <span>Order Total</span>

                <strong>
                  ₹{order.total}
                </strong>
              </div>
            </div>

            {/* Items */}
            <div className="details-section">
              <h3>Order Items</h3>

              <div className="order-items">
                {order.items?.map((item, index) => (
                  <div
                    className="order-item"
                    key={index}
                  >
                    <div>
                      <strong>
                        {item.name}
                      </strong>

                      <span>
                        Qty: {item.quantity}
                      </span>
                    </div>

                    <strong>
                      ₹{item.price * item.quantity}
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="details-card">
            <div className="details-card-header">
              <div>
                <h2>Customer Information</h2>

                <p>
                  Customer contact and delivery address.
                </p>
              </div>
            </div>

            <div className="customer-info">
              <div className="customer-profile">
                <div className="customer-avatar">
                  {customerInitials}
                </div>

                <div>
                  <strong>
                    {customerName}
                  </strong>

                  <span>
                    Customer
                  </span>
                </div>
              </div>

              <div className="customer-detail">
                <span>Phone</span>

                <strong>
                  {order.deliveryDetails?.phone ||
                    "N/A"}
                </strong>
              </div>

              <div className="customer-detail">
                <span>Email</span>

                <strong>
                  {order.customer?.email ||
                    "N/A"}
                </strong>
              </div>

              <div className="customer-detail">
                <span>Delivery Address</span>

                <strong>
                  {order.deliveryDetails?.address ||
                    "N/A"}
                </strong>
              </div>

              {order.deliveryDetails
                ?.specialInstructions && (
                <div className="customer-detail">
                  <span>
                    Special Instructions
                  </span>

                  <strong>
                    {
                      order.deliveryDetails
                        .specialInstructions
                    }
                  </strong>
                </div>
              )}

              <div className="customer-detail">
                <span>Payment Status</span>

                <strong>
                  {order.paymentStatus}
                </strong>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Status */}
        <div className="details-card delivery-status-card">
          <div className="details-card-header">
            <div>
              <h2>Delivery Status</h2>

              <p>
                Update the current status of this
                delivery.
              </p>
            </div>
          </div>

          <div className="delivery-status-content">
            <div className="current-status">
              <span className="status-indicator"></span>

              <div>
                <span>Current Status</span>

                <strong>
                  {order.status}
                </strong>
              </div>
            </div>

            <div className="status-actions">
              <button
                type="button"
                className="status-action-btn"
                onClick={() =>
                  updateStatus("Out for Delivery")
                }
                disabled={
                  updating ||
                  order.status ===
                    "Out for Delivery" ||
                  order.status === "Delivered"
                }
              >
                {updating &&
                order.status !== "Delivered"
                  ? "Updating..."
                  : "Picked Up"}
              </button>

              <button
                type="button"
                className="status-action-btn primary"
                onClick={() =>
                  updateStatus("Delivered")
                }
                disabled={
                  updating ||
                  order.status === "Delivered"
                }
              >
                {updating
                  ? "Updating..."
                  : "Mark as Delivered"}
              </button>
            </div>
          </div>
        </div>

        {/* Payment Status */}
        <div className="details-card delivery-status-card">
          <div className="details-card-header">
            <div>
              <h2>Payment Status</h2>

              <p>
                Update the payment status for this
                order.
              </p>
            </div>
          </div>

          <div className="delivery-status-content">
            <div className="current-status">
              <span className="status-indicator"></span>

              <div>
                <span>Current Payment Status</span>

                <strong>
                  {order.paymentStatus}
                </strong>
              </div>
            </div>

            <div className="status-actions">
              <select
                value={paymentStatus}
                onChange={(event) =>
                  setPaymentStatus(event.target.value)
                }
                disabled={updatingPayment}
              >
                <option value="Pending">
                  Pending
                </option>

                <option value="Paid">
                  Paid
                </option>

                <option value="Failed">
                  Failed
                </option>
              </select>

              <button
                type="button"
                className="status-action-btn primary"
                onClick={updatePaymentStatus}
                disabled={updatingPayment}
              >
                {updatingPayment
                  ? "Updating..."
                  : "Update Payment Status"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DeliveryDetails;