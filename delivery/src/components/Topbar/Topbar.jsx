import { useLocation } from "react-router-dom";
import "./Topbar.css";

function Topbar() {
  const location = useLocation();

  const pageTitles = {
    "/dashboard": {
      title: "Dashboard",
      subtitle: "Welcome back! Here's your delivery overview.",
    },
    "/deliveries": {
      title: "My Deliveries",
      subtitle: "View and manage your assigned deliveries.",
    },
    "/profile": {
      title: "Profile",
      subtitle: "Manage your delivery partner profile.",
    },
  };

  const currentPage = pageTitles[location.pathname] || {
    title: "Delivery Partner",
    subtitle: "Manage your deliveries with Flavor Feast.",
  };

  return (
    <header className="delivery-topbar">
      <div className="topbar-left">
        <div className="topbar-title">
          <h1>{currentPage.title}</h1>
          <p>{currentPage.subtitle}</p>
        </div>
      </div>

      <div className="topbar-right">
        <div className="delivery-status">
          <span className="status-dot"></span>
          <span>Available</span>
        </div>

        <div className="topbar-profile">
          <div className="profile-avatar">DP</div>

          <div className="profile-info">
            <span className="profile-name">Delivery Partner</span>
            <span className="profile-role">Delivery Partner</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;