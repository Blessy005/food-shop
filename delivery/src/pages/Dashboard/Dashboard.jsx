import { useEffect, useState } from "react";

import {
  Link,
  useOutletContext,
} from "react-router-dom";

import "./Dashboard.css";

function Dashboard() {
  const { isAvailable } = useOutletContext();

  const [deliveries, setDeliveries] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // =========================================
  // FETCH DELIVERIES
  // =========================================

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const token = localStorage.getItem("deliveryToken");

        if (!token) {
          setError("Authentication required.");
          return;
        }

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/orders/delivery`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch deliveries"
          );
        }

        setDeliveries(data);
      } catch (error) {
        console.error(
          "Delivery Dashboard Error:",
          error
        );

        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveries();
  }, []);

  // =========================================
  // DELIVERY COUNTS
  // =========================================

  const assignedCount = deliveries.length;

  const pendingCount = deliveries.filter(
    (order) =>
      order.status === "Pending" ||
      order.status === "Confirmed" ||
      order.status === "Preparing"
  ).length;

  const outForDeliveryCount = deliveries.filter(
    (order) => order.status === "Out for Delivery"
  ).length;

  const deliveredTodayCount = deliveries.filter(
    (order) => {
      if (order.status !== "Delivered") {
        return false;
      }

      const today = new Date();

      const orderDate = new Date(
        order.updatedAt
      );

      return (
        today.getFullYear() ===
          orderDate.getFullYear() &&
        today.getMonth() ===
          orderDate.getMonth() &&
        today.getDate() ===
          orderDate.getDate()
      );
    }
  ).length;

  // Show latest assigned orders first
  const recentDeliveries = deliveries.slice(0, 4);

  // =========================================
  // STATUS CLASS
  // =========================================

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
        return "status-pending";

      default:
        return "";
    }
  };

  return (
    <section className="dashboard-page">
      <div className="dashboard-container">

        {/* =========================================
            PAGE HEADER
        ========================================= */}

        <div className="dashboard-header">
          <div>
            <h1>Dashboard</h1>

            <p>
              Here's an overview of your deliveries today.
            </p>
          </div>

          <Link
            to="/deliveries"
            className="dashboard-view-btn"
          >
            View Deliveries
          </Link>
        </div>

        {/* =========================================
            LOADING
        ========================================= */}

        {loading && (
          <p>Loading deliveries...</p>
        )}

        {/* =========================================
            ERROR
        ========================================= */}

        {!loading && error && (
          <p className="login-error">
            {error}
          </p>
        )}

        {!loading && !error && (
          <>
            {/* =========================================
                STATS
            ========================================= */}

            <div className="dashboard-stats">

              <div className="dashboard-stat-card">
                <div className="stat-icon stat-icon-total">
                  📦
                </div>

                <div>
                  <span className="stat-label">
                    Assigned Deliveries
                  </span>

                  <h3>{assignedCount}</h3>
                </div>
              </div>

              <div className="dashboard-stat-card">
                <div className="stat-icon stat-icon-pending">
                  ⏳
                </div>

                <div>
                  <span className="stat-label">
                    Pending
                  </span>

                  <h3>{pendingCount}</h3>
                </div>
              </div>

              <div className="dashboard-stat-card">
                <div className="stat-icon stat-icon-progress">
                  🚴
                </div>

                <div>
                  <span className="stat-label">
                    Out for Delivery
                  </span>

                  <h3>
                    {outForDeliveryCount}
                  </h3>
                </div>
              </div>

              <div className="dashboard-stat-card">
                <div className="stat-icon stat-icon-completed">
                  ✓
                </div>

                <div>
                  <span className="stat-label">
                    Delivered Today
                  </span>

                  <h3>
                    {deliveredTodayCount}
                  </h3>
                </div>
              </div>

            </div>

            {/* =========================================
                MAIN DASHBOARD CONTENT
            ========================================= */}

            <div className="dashboard-grid">

              {/* =========================================
                  TODAY'S DELIVERIES
              ========================================= */}

              <div className="dashboard-section delivery-overview">

                <div className="dashboard-section-header">
                  <div>
                    <h2>Today's Deliveries</h2>

                    <p>
                      Your recently assigned orders.
                    </p>
                  </div>

                  <Link to="/deliveries">
                    View All
                  </Link>
                </div>

                <div className="delivery-list">

                  {recentDeliveries.length === 0 ? (
                    <p>
                      No deliveries assigned yet.
                    </p>
                  ) : (
                    recentDeliveries.map((order) => (
                      <div
                        className="delivery-item"
                        key={order._id}
                      >
                        <div className="delivery-order-info">

                          <strong>
                            #{order.orderNumber}
                          </strong>

                          <span>
                            {order.items.length}{" "}
                            {order.items.length === 1
                              ? "item"
                              : "items"}{" "}
                            • ₹{order.total}
                          </span>

                        </div>

                        <span
                          className={`status-badge ${getStatusClass(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>
                    ))
                  )}

                </div>
              </div>

              {/* =========================================
                  QUICK INFO
              ========================================= */}

              <div className="dashboard-section quick-info">

                <div className="dashboard-section-header">
                  <div>
                    <h2>Quick Info</h2>

                    <p>
                      Your delivery partner status.
                    </p>
                  </div>
                </div>

                <div className="quick-info-content">

                  {/* Availability */}

                  <div className="availability-box">

                    <span
                      className={`availability-dot ${
                        isAvailable
                          ? "available"
                          : "unavailable"
                      }`}
                    ></span>

                    <div>
                      <strong>
                        {isAvailable
                          ? "You're Available"
                          : "You're Unavailable"}
                      </strong>

                      <p>
                        {isAvailable
                          ? "You can receive new deliveries."
                          : "You cannot receive new deliveries."}
                      </p>
                    </div>

                  </div>

                  {/* Today's Completed */}

                  <div className="quick-info-row">

                    <span>
                      Today's completed
                    </span>

                    <strong>
                      {deliveredTodayCount}{" "}
                      {deliveredTodayCount === 1
                        ? "delivery"
                        : "deliveries"}
                    </strong>

                  </div>

                  {/* Current Status */}

                  <div className="quick-info-row">

                    <span>
                      Current status
                    </span>

                    <strong>
                      {isAvailable
                        ? "Available"
                        : "Unavailable"}
                    </strong>

                  </div>

                </div>
              </div>

            </div>
          </>
        )}

      </div>
    </section>
  );
}

export default Dashboard;