import { Link } from "react-router-dom";

import "./Deliveries.css";

function Deliveries() {
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
          <button className="filter-btn active">
            All
          </button>

          <button className="filter-btn">
            Pending
          </button>

          <button className="filter-btn">
            Out for Delivery
          </button>

          <button className="filter-btn">
            Delivered
          </button>
        </div>

        {/* Delivery List */}
        <div className="deliveries-list">

          {/* Delivery 1 */}
          <div className="delivery-card">
            <div className="delivery-card-header">
              <div>
                <span className="delivery-order-id">
                  #FF1024
                </span>

                <span className="delivery-date">
                  Today, 12:30 PM
                </span>
              </div>

              <span className="status-badge status-confirmed">
                Confirmed
              </span>
            </div>

            <div className="delivery-card-body">
              <div className="delivery-info">
                <span className="info-label">
                  Customer
                </span>
                <strong>
                  Customer Name
                </strong>
              </div>

              <div className="delivery-info">
                <span className="info-label">
                  Items
                </span>
                <strong>
                  3 items
                </strong>
              </div>

              <div className="delivery-info">
                <span className="info-label">
                  Order Total
                </span>
                <strong>
                  ₹540
                </strong>
              </div>

              <div className="delivery-info">
                <span className="info-label">
                  Delivery Address
                </span>
                <strong>
                  Coimbatore
                </strong>
              </div>
            </div>

            <div className="delivery-card-footer">
              <span className="delivery-status-text">
                Ready for delivery
              </span>

              <Link
                to="/deliveries/FF1024"
                className="delivery-view-btn"
              >
                View Details
              </Link>
            </div>
          </div>

          {/* Delivery 2 */}
          <div className="delivery-card">
            <div className="delivery-card-header">
              <div>
                <span className="delivery-order-id">
                  #FF1021
                </span>

                <span className="delivery-date">
                  Today, 1:15 PM
                </span>
              </div>

              <span className="status-badge status-preparing">
                Preparing
              </span>
            </div>

            <div className="delivery-card-body">
              <div className="delivery-info">
                <span className="info-label">
                  Customer
                </span>
                <strong>
                  Customer Name
                </strong>
              </div>

              <div className="delivery-info">
                <span className="info-label">
                  Items
                </span>
                <strong>
                  2 items
                </strong>
              </div>

              <div className="delivery-info">
                <span className="info-label">
                  Order Total
                </span>
                <strong>
                  ₹320
                </strong>
              </div>

              <div className="delivery-info">
                <span className="info-label">
                  Delivery Address
                </span>
                <strong>
                  Coimbatore
                </strong>
              </div>
            </div>

            <div className="delivery-card-footer">
              <span className="delivery-status-text">
                Restaurant is preparing your order
              </span>

              <Link
                to="/deliveries/FF1021"
                className="delivery-view-btn"
              >
                View Details
              </Link>
            </div>
          </div>

          {/* Delivery 3 */}
          <div className="delivery-card">
            <div className="delivery-card-header">
              <div>
                <span className="delivery-order-id">
                  #FF1018
                </span>

                <span className="delivery-date">
                  Today, 2:00 PM
                </span>
              </div>

              <span className="status-badge status-out-for-delivery">
                Out for Delivery
              </span>
            </div>

            <div className="delivery-card-body">
              <div className="delivery-info">
                <span className="info-label">
                  Customer
                </span>
                <strong>
                  Customer Name
                </strong>
              </div>

              <div className="delivery-info">
                <span className="info-label">
                  Items
                </span>
                <strong>
                  4 items
                </strong>
              </div>

              <div className="delivery-info">
                <span className="info-label">
                  Order Total
                </span>
                <strong>
                  ₹780
                </strong>
              </div>

              <div className="delivery-info">
                <span className="info-label">
                  Delivery Address
                </span>
                <strong>
                  Coimbatore
                </strong>
              </div>
            </div>

            <div className="delivery-card-footer">
              <span className="delivery-status-text">
                Order is on the way
              </span>

              <Link
                to="/deliveries/FF1018"
                className="delivery-view-btn"
              >
                View Details
              </Link>
            </div>
          </div>

          {/* Delivery 4 */}
          <div className="delivery-card">
            <div className="delivery-card-header">
              <div>
                <span className="delivery-order-id">
                  #FF1015
                </span>

                <span className="delivery-date">
                  Today, 10:45 AM
                </span>
              </div>

              <span className="status-badge status-delivered">
                Delivered
              </span>
            </div>

            <div className="delivery-card-body">
              <div className="delivery-info">
                <span className="info-label">
                  Customer
                </span>
                <strong>
                  Customer Name
                </strong>
              </div>

              <div className="delivery-info">
                <span className="info-label">
                  Items
                </span>
                <strong>
                  1 item
                </strong>
              </div>

              <div className="delivery-info">
                <span className="info-label">
                  Order Total
                </span>
                <strong>
                  ₹180
                </strong>
              </div>

              <div className="delivery-info">
                <span className="info-label">
                  Delivery Address
                </span>
                <strong>
                  Coimbatore
                </strong>
              </div>
            </div>

            <div className="delivery-card-footer">
              <span className="delivery-status-text">
                Successfully delivered
              </span>

              <Link
                to="/deliveries/FF1015"
                className="delivery-view-btn"
              >
                View Details
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Deliveries;