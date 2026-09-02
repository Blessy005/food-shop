import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Deliveries.css";

function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("deliveryToken");

        if (!token) {
          setError("Please login again.");
          return;
        }

        const response = await fetch(
          `${API_URL}/orders/delivery`,
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

        setDeliveries(data || []);
      } catch (error) {
        console.error("Delivery Fetch Error:", error);
        setError(error.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveries();
  }, [API_URL]);

  const getFilteredDeliveries = () => {
    if (activeFilter === "All") {
      return deliveries;
    }

    if (activeFilter === "Pending") {
      return deliveries.filter((delivery) =>
        ["Pending", "Confirmed", "Preparing"].includes(
          delivery.status
        )
      );
    }

    if (activeFilter === "Out for Delivery") {
      return deliveries.filter(
        (delivery) => delivery.status === "Out for Delivery"
      );
    }

    if (activeFilter === "Delivered") {
      return deliveries.filter(
        (delivery) => delivery.status === "Delivered"
      );
    }

    return deliveries;
  };

  const filteredDeliveries = getFilteredDeliveries();

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

  const getStatusText = (status) => {
    switch (status) {
      case "Pending":
        return "Waiting for confirmation";

      case "Confirmed":
        return "Order confirmed";

      case "Preparing":
        return "Restaurant is preparing your order";

      case "Out for Delivery":
        return "Order is on the way";

      case "Delivered":
        return "Successfully delivered";

      default:
        return "Order status updated";
    }
  };

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <section className="deliveries-page">
      <div className="deliveries-container">

        {/* Page Header */}
        <div className="deliveries-header">
          <div>
            <h1>My Deliveries</h1>
            <p>
              View and manage your assigned deliveries.
            </p>
          </div>
        </div>

        {/* Delivery Filters */}
        <div className="delivery-filters">
          {[
            "All",
            "Pending",
            "Out for Delivery",
            "Delivered",
          ].map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${
                activeFilter === filter ? "active" : ""
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="deliveries-list">
            <p>Loading deliveries...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="deliveries-list">
            <p>{error}</p>
          </div>
        )}

        {/* Delivery List */}
        {!loading && !error && (
          <div className="deliveries-list">

            {filteredDeliveries.length === 0 ? (
              <p>No deliveries found.</p>
            ) : (
              filteredDeliveries.map((delivery) => (
                <div
                  className="delivery-card"
                  key={delivery._id}
                >

                  {/* Card Header */}
                  <div className="delivery-card-header">
                    <div>
                      <span className="delivery-order-id">
                        #{delivery.orderNumber}
                      </span>

                      <span className="delivery-date">
                        {formatDate(delivery.createdAt)}
                      </span>
                    </div>

                    <span
                      className={`status-badge ${getStatusClass(
                        delivery.status
                      )}`}
                    >
                      {delivery.status}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="delivery-card-body">

                    <div className="delivery-info">
                      <span className="info-label">
                        Customer
                      </span>

                      <strong>
                        {delivery.deliveryDetails?.name ||
                          delivery.customer?.name ||
                          "N/A"}
                      </strong>
                    </div>

                    <div className="delivery-info">
                      <span className="info-label">
                        Items
                      </span>

                      <strong>
                        {delivery.items?.length || 0}{" "}
                        {delivery.items?.length === 1
                          ? "item"
                          : "items"}
                      </strong>
                    </div>

                    <div className="delivery-info">
                      <span className="info-label">
                        Order Total
                      </span>

                      <strong>
                        ₹{delivery.total}
                      </strong>
                    </div>

                    <div className="delivery-info">
                      <span className="info-label">
                        Delivery Address
                      </span>

                      <strong>
                        {delivery.deliveryDetails?.address ||
                          "N/A"}
                      </strong>
                    </div>

                  </div>

                  {/* Card Footer */}
                  <div className="delivery-card-footer">

                    <span className="delivery-status-text">
                      {getStatusText(delivery.status)}
                    </span>

                    <Link
                      to={`/deliveries/${delivery._id}`}
                      className="delivery-view-btn"
                    >
                      View Details
                    </Link>

                  </div>

                </div>
              ))
            )}

          </div>
        )}

      </div>
    </section>
  );
}

export default Deliveries;