import { Link, useParams } from "react-router-dom";

import "./DeliveryDetails.css";

function DeliveryDetails() {
  const { id } = useParams();

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

            <h1>#{id}</h1>

            <p>
              View order information and update delivery status.
            </p>
          </div>

          <span className="status-badge status-out-for-delivery">
            Out for Delivery
          </span>
        </div>

        {/* Main Content */}
        <div className="details-grid">

          {/* Order Information */}
          <div className="details-card">

            <div className="details-card-header">
              <div>
                <h2>Order Information</h2>
                <p>Details about this customer order.</p>
              </div>
            </div>

            <div className="order-info-grid">

              <div className="order-info-item">
                <span>Order ID</span>
                <strong>#{id}</strong>
              </div>

              <div className="order-info-item">
                <span>Order Date</span>
                <strong>Today, 2:00 PM</strong>
              </div>

              <div className="order-info-item">
                <span>Total Items</span>
                <strong>4 items</strong>
              </div>

              <div className="order-info-item">
                <span>Order Total</span>
                <strong>₹780</strong>
              </div>

            </div>

            {/* Items */}
            <div className="details-section">
              <h3>Order Items</h3>

              <div className="order-items">

                <div className="order-item">
                  <div>
                    <strong>Chicken Biryani</strong>
                    <span>Qty: 2</span>
                  </div>

                  <strong>₹360</strong>
                </div>

                <div className="order-item">
                  <div>
                    <strong>Chicken 65</strong>
                    <span>Qty: 1</span>
                  </div>

                  <strong>₹220</strong>
                </div>

                <div className="order-item">
                  <div>
                    <strong>Fresh Lime Juice</strong>
                    <span>Qty: 2</span>
                  </div>

                  <strong>₹200</strong>
                </div>

              </div>
            </div>

          </div>

          {/* Customer Information */}
          <div className="details-card">

            <div className="details-card-header">
              <div>
                <h2>Customer Information</h2>
                <p>Customer contact and delivery address.</p>
              </div>
            </div>

            <div className="customer-info">

              <div className="customer-profile">
                <div className="customer-avatar">
                  CN
                </div>

                <div>
                  <strong>Customer Name</strong>
                  <span>Customer</span>
                </div>
              </div>

              <div className="customer-detail">
                <span>Phone</span>
                <strong>+91 XXXXX XXXXX</strong>
              </div>

              <div className="customer-detail">
                <span>Email</span>
                <strong>customer@example.com</strong>
              </div>

              <div className="customer-detail">
                <span>Delivery Address</span>
                <strong>
                  123, Main Street,
                  <br />
                  Coimbatore, Tamil Nadu
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
                Update the current status of this delivery.
              </p>
            </div>
          </div>

          <div className="delivery-status-content">

            <div className="current-status">
              <span className="status-indicator"></span>

              <div>
                <span>Current Status</span>
                <strong>Out for Delivery</strong>
              </div>
            </div>

            <div className="status-actions">
              <button
                type="button"
                className="status-action-btn"
              >
                Picked Up
              </button>

              <button
                type="button"
                className="status-action-btn primary"
              >
                Mark as Delivered
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default DeliveryDetails;