import { useState } from "react";

import "./Profile.css";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Delivery Partner",
    email: "delivery@flavorfeast.com",
    phone: "+91 98765 43210",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    setIsEditing(false);

    console.log("Updated Delivery Partner Profile:", profile);
  };

  return (
    <section className="profile-page">
      <div className="profile-container">
        {/* Page Header */}
        <div className="profile-header">
          <div>
            <h1>Profile</h1>
            <p>Manage your delivery partner account.</p>
          </div>

          {!isEditing && (
            <button
              type="button"
              className="profile-edit-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Profile Card */}
        <div className="profile-card">
          {/* Profile Overview */}
          <div className="profile-overview">
            <div className="profile-avatar-large">DP</div>

            <div>
              <h2>{profile.name}</h2>
              <p>Delivery Partner</p>
            </div>
          </div>

          {/* Profile Form */}
          <form
            className="profile-form"
            onSubmit={handleSave}
          >
            <div className="profile-form-grid">
              {/* Name */}
              <div className="profile-form-group">
                <label htmlFor="name">Full Name</label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={profile.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              {/* Email */}
              <div className="profile-form-group">
                <label htmlFor="email">Email Address</label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              {/* Phone */}
              <div className="profile-form-group">
                <label htmlFor="phone">Phone Number</label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              {/* Role */}
              <div className="profile-form-group">
                <label htmlFor="role">Role</label>

                <input
                  id="role"
                  type="text"
                  value="Delivery Partner"
                  disabled
                  readOnly
                />
              </div>
            </div>

            {/* Edit Actions */}
            {isEditing && (
              <div className="profile-actions">
                <button
                  type="button"
                  className="profile-cancel-btn"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="profile-save-btn"
                >
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Availability Card */}
        <div className="profile-card availability-card">
          <div className="availability-card-header">
            <div>
              <h2>Delivery Availability</h2>
              <p>
                Your current availability status for receiving orders.
              </p>
            </div>

            <span className="availability-status">
              <span className="availability-status-dot"></span>
              Available
            </span>
          </div>

          <div className="availability-info">
            <span>
              You are currently available to receive new deliveries.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;