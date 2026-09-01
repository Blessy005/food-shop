import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("deliveryToken");
    localStorage.removeItem("deliveryUser");

    navigate("/login");
  };

  return (
    <aside className="delivery-sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <h2>Flavor Feast</h2>
        <span>Delivery Partner</span>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <p className="sidebar-heading">MENU</p>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <span className="sidebar-icon">▦</span>
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/deliveries"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <span className="sidebar-icon">▤</span>
          <span>My Deliveries</span>
        </NavLink>

        <p className="sidebar-heading sidebar-heading-spaced">
          ACCOUNT
        </p>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <span className="sidebar-icon">◯</span>
          <span>Profile</span>
        </NavLink>
      </nav>

      {/* Bottom */}
      <div className="sidebar-bottom">
        <button
          type="button"
          className="sidebar-logout"
          onClick={handleLogout}
        >
          <span className="sidebar-icon">↪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;