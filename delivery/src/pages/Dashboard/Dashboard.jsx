import { Link } from "react-router-dom";

import "./Dashboard.css";

function Dashboard() {
  return (
    <section className="dashboard-page">
      <div className="dashboard-container">
        {/* Page Header */}
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

        {/* Stats */}
        <div className="dashboard-stats">
          <div className="dashboard-stat-card">
            <div className="stat-icon stat-icon-total">
              📦
            </div>

            <div>
              <span className="stat-label">
                Assigned Deliveries
              </span>
              <h3>8</h3>
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
              <h3>3</h3>
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
              <h3>2</h3>
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
              <h3>3</h3>
            </div>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="dashboard-grid">
          {/* Today's Deliveries */}
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
              <div className="delivery-item">
                <div className="delivery-order-info">
                  <strong>#FF1024</strong>
                  <span>
                    3 items • ₹540
                  </span>
                </div>

                <span className="status-badge status-confirmed">
                  Confirmed
                </span>
              </div>

              <div className="delivery-item">
                <div className="delivery-order-info">
                  <strong>#FF1021</strong>
                  <span>
                    2 items • ₹320
                  </span>
                </div>

                <span className="status-badge status-preparing">
                  Preparing
                </span>
              </div>

              <div className="delivery-item">
                <div className="delivery-order-info">
                  <strong>#FF1018</strong>
                  <span>
                    4 items • ₹780
                  </span>
                </div>

                <span className="status-badge status-out-for-delivery">
                  Out for Delivery
                </span>
              </div>

              <div className="delivery-item">
                <div className="delivery-order-info">
                  <strong>#FF1015</strong>
                  <span>
                    1 item • ₹180
                  </span>
                </div>

                <span className="status-badge status-delivered">
                  Delivered
                </span>
              </div>
            </div>
          </div>

          {/* Quick Info */}
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
              <div className="availability-box">
                <span className="availability-dot"></span>

                <div>
                  <strong>You're Available</strong>
                  <p>
                    You can receive new deliveries.
                  </p>
                </div>
              </div>

              <div className="quick-info-row">
                <span>Today's completed</span>
                <strong>3 deliveries</strong>
              </div>

              <div className="quick-info-row">
                <span>Current status</span>
                <strong>Available</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;