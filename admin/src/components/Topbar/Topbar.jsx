import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Topbar.css";

function Topbar() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const adminUser = JSON.parse(localStorage.getItem("adminUser"));

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    localStorage.removeItem("adminRememberMe");

    navigate("/admin/login");
  };

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
        <div className="admin-profile-wrapper">

          <button
            className="admin-profile"
            onClick={() => setShowMenu(!showMenu)}
          >
            <div className="admin-avatar">
              {adminUser?.name?.charAt(0).toUpperCase() || "A"}
            </div>

            <div className="admin-info">
              <span className="admin-name">
                {adminUser?.name || "Admin"}
              </span>

              <span className="admin-role">
                Administrator
              </span>
            </div>

            <span className="profile-arrow">
              {showMenu ? "⌃" : "⌄"}
            </span>
          </button>

          {/* Profile Dropdown */}
          {showMenu && (
            <div className="admin-dropdown">
              <div className="dropdown-user">
                <strong>{adminUser?.name || "Admin"}</strong>
                <span>{adminUser?.email || ""}</span>
              </div>

              <div className="dropdown-divider"></div>

              <button
                className="logout-button"
                onClick={handleLogout}
              >
                🚪 Logout
              </button>
            </div>
          )}

        </div>

      </div>
    </header>
  );
}

export default Topbar;