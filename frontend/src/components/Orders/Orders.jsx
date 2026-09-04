import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("customerToken");

      if (!token) {
        setError("Please login to view your orders.");
        return;
      }

      const response = await fetch(`${API_URL}/orders/my-orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch orders");
      }

      setOrders(data);
    } catch (error) {
      console.error("Fetch Customer Orders Error:", error);
      setError(error.message || "Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Real-time order updates
  useEffect(() => {
    const socket = io(SERVER_URL);

    socket.on("connect", () => {
      console.log("Customer connected to Socket.IO:", socket.id);
    });

    // Order status changed
    socket.on("orderStatusUpdated", (updatedOrder) => {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id
            ? {
                ...order,
                status: updatedOrder.status,
              }
            : order
        )
      );
    });

    // Payment status changed
    socket.on("orderPaymentStatusUpdated", (updatedOrder) => {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id
            ? {
                ...order,
                paymentStatus: updatedOrder.paymentStatus,
              }
            : order
        )
      );
    });

    socket.on("disconnect", () => {
      console.log("Customer disconnected from Socket.IO");
    });

    return () => {
      socket.disconnect();
    };
  }, [SERVER_URL]);

  // Handles both customer/public images and backend uploads
  const getImageUrl = (image) => {
    if (!image) return null;

    if (image.startsWith("/uploads/")) {
      return `${SERVER_URL}${image}`;
    }

    return image;
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "status-pending";

      case "Confirmed":
        return "status-confirmed";

      case "Preparing":
        return "status-preparing";

      case "Out for Delivery":
        return "status-out-for-delivery";

      case "Delivered":
        return "status-delivered";

      case "Cancelled":
        return "status-cancelled";

      default:
        return "";
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <main className="orders-page">
        <div className="orders-container">
          <div className="orders-header">
            <h1>My Orders</h1>
            <p>Track your Flavor Feast orders</p>
          </div>

          <div className="orders-message">
            <p>Loading your orders...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="orders-page">
        <div className="orders-container">
          <div className="orders-header">
            <h1>My Orders</h1>
            <p>Track your Flavor Feast orders</p>
          </div>

          <div className="orders-message error">
            <p>{error}</p>

            <button onClick={fetchOrders}>
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="orders-page">
      <div className="orders-container">

        <div className="orders-header">
          <h1>My Orders</h1>
          <p>Track your Flavor Feast orders</p>
        </div>

        {orders.length === 0 ? (
          <div className="orders-message">
            <div className="empty-icon">🧾</div>

            <h2>No orders yet</h2>

            <p>
              You haven't placed any orders yet.
            </p>
          </div>
        ) : (
          <div className="orders-list">

            {orders.map((order) => (
              <div
                className="order-card"
                key={order._id}
              >

                {/* ORDER HEADER */}
                <div className="order-card-header">

                  <div>
                    <span className="order-label">
                      Order
                    </span>

                    <h2>
                      #{order.orderNumber}
                    </h2>

                    <p>
                      {formatDate(order.createdAt)} •{" "}
                      {formatTime(order.createdAt)}
                    </p>
                  </div>

                  <span
                    className={`order-status ${getStatusClass(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>

                </div>

                {/* ORDER ITEMS */}
                <div className="order-items">

                  {order.items.map((item, index) => {
                    const imageUrl = getImageUrl(
                      item.product?.image
                    );

                    return (
                      <div
                        className="order-item"
                        key={`${order._id}-${index}`}
                      >

                        <div className="order-item-image">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={
                                item.product?.name ||
                                "Food Item"
                              }
                            />
                          ) : (
                            <span>🍴</span>
                          )}
                        </div>

                        <div className="order-item-info">
                          <h3>
                            {item.product?.name ||
                              "Food Item"}
                          </h3>

                          <p>
                            Qty: {item.quantity}
                          </p>
                        </div>

                        <div className="order-item-price">
                          ₹
                          {(
                            item.price *
                            item.quantity
                          ).toFixed(2)}
                        </div>

                      </div>
                    );
                  })}

                </div>

                {/* ORDER FOOTER */}
                <div className="order-card-footer">

                  <div className="payment-info">
                    <span>Payment</span>

                    <strong>
                      {order.paymentStatus}
                    </strong>
                  </div>

                  <div className="order-total">
                    <span>Total</span>

                    <strong>
                      ₹{order.total.toFixed(2)}
                    </strong>
                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}

export default Orders;