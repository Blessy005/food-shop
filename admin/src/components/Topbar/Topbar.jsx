import "./Topbar.css";

function Topbar() {
  return (
    <header className="topbar">

      {/* Page Title */}
      <div className="topbar-left">
        <h1>Dashboard</h1>
      </div>

      {/* Right Side */}
      <div className="topbar-right">

        {/* Notification */}
        <button
          className="notification-button"
          aria-label="Notifications"
        >
          <span className="notification-icon">🔔</span>
          <span className="notification-dot"></span>
        </button>

        {/* Admin Profile */}
        <button className="admin-profile">

          <div className="admin-avatar">
            A
          </div>

          <div className="admin-info">
            <span className="admin-name">
              Admin
            </span>

            <span className="admin-role">
              Administrator
            </span>
          </div>

          <span className="profile-arrow">
            ⌄
          </span>

        </button>

      </div>

    </header>
  );
}

export default Topbar;