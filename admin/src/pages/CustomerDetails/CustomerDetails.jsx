import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./CustomerDetails.css";

function CustomerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch customer");
        }

        const data = await response.json();

        setCustomer(data);
      } catch (error) {
        console.error("Error fetching customer:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  if (loading) {
    return <p>Loading customer...</p>;
  }

  if (!customer) {
    return (
      <div className="customer-details-page">
        <h1>Customer not found</h1>

        <button onClick={() => navigate("/admin/customers")}>
          Back to Customers
        </button>
      </div>
    );
  }

  return (
    <div className="customer-details-page">

      {/* Page Header */}
      <div className="customer-details-header">
        <div>
          <p className="customer-details-back">
            Customers / Customer Details
          </p>

          <h1>{customer.name}</h1>

          <p>
            Customer ID: {customer._id}
          </p>
        </div>

        <span className="customer-details-status">
          {customer.role === "customer" ? "Active" : "Admin"}
        </span>
      </div>

      {/* Customer Information */}
      <div className="customer-details-card">
        <div className="customer-card-header">
          <h2>Customer Information</h2>
        </div>

        <div className="customer-profile">

          <div className="customer-profile-avatar">
            {customer.name.charAt(0).toUpperCase()}
          </div>

          <div className="customer-profile-info">
            <h3>{customer.name}</h3>

            <p>{customer.email}</p>

            <p>
              Joined:{" "}
              {new Date(customer.createdAt).toLocaleDateString(
                "en-IN",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }
              )}
            </p>
          </div>

        </div>
      </div>

      {/* Customer Statistics */}
      <div className="customer-detail-stats">

        <div className="customer-detail-stat-card">
          <div className="customer-detail-stat-icon orders">
            🛍
          </div>

          <div>
            <span>Total Orders</span>
            <h2>0</h2>
          </div>
        </div>

        <div className="customer-detail-stat-card">
          <div className="customer-detail-stat-icon spent">
            ₹
          </div>

          <div>
            <span>Total Spent</span>
            <h2>₹0</h2>
          </div>
        </div>

      </div>

      {/* Order History */}
      <div className="customer-details-card">

        <div className="customer-card-header">
          <div>
            <h2>Order History</h2>
            <p>
              Recent orders placed by this customer.
            </p>
          </div>

          <span>0 recent orders</span>
        </div>

        <div className="customer-order-table-wrapper">

          <table className="customer-order-table">

            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No orders found.
                </td>
              </tr>
            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
}

export default CustomerDetails;