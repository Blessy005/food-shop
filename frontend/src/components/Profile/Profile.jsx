import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("customerUser");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <main className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <h1>My Profile</h1>
          <p>Manage your Flavor Feast account.</p>
        </div>

        <div className="profile-card">
          <div className="profile-field">
            <span className="profile-label">Name</span>
            <span className="profile-value">{user.name}</span>
          </div>

          <div className="profile-field">
            <span className="profile-label">Email</span>
            <span className="profile-value">{user.email}</span>
          </div>

          <div className="profile-field">
            <span className="profile-label">Account Type</span>
            <span className="profile-value">Customer</span>
          </div>
        </div>

        <div className="profile-actions">
          <button
            className="profile-orders-btn"
            onClick={() => navigate("/orders")}
          >
            My Orders
          </button>

          <button
            className="profile-home-btn"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      </div>
    </main>
  );
}

export default Profile;