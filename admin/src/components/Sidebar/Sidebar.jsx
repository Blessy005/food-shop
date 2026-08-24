import { NavLink } from "react-router-dom";

import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">

      {/* Brand */}
      <div className="sidebar-brand">

        <div className="brand-icon">
          🍴
        </div>

        <div>
          <h2>Flavor Feast</h2>
          <span>Admin Panel</span>
        </div>

      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">

        {/* Main */}
        <div className="nav-section">

          <p className="nav-section-title">
            MAIN
          </p>

          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            <span className="nav-icon">⌂</span>
            <span>Dashboard</span>
          </NavLink>

        </div>

        {/* Management */}
        <div className="nav-section">

          <p className="nav-section-title">
            MANAGEMENT
          </p>

          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            <span className="nav-icon">▤</span>
            <span>Products</span>
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            <span className="nav-icon">◫</span>
            <span>Orders</span>
          </NavLink>

          <NavLink
            to="/admin/customers"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            <span className="nav-icon">♙</span>
            <span>Customers</span>
          </NavLink>

        </div>

        {/* System */}
        <div className="nav-section">

          <p className="nav-section-title">
            SYSTEM
          </p>

          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            <span className="nav-icon">⚙</span>
            <span>Settings</span>
          </NavLink>

          <button
            className="nav-link nav-button"
            onClick={() => console.log("Logout later")}
          >
            <span className="nav-icon">↪</span>
            <span>Logout</span>
          </button>

        </div>

      </nav>

      {/* Bottom Brand Message */}
      <div className="sidebar-footer">
        <span>Flavor Feast</span>
        <small>Admin Dashboard</small>
      </div>

    </aside>
  );
}

export default Sidebar;