import { useEffect, useState } from "react";

import { useOutletContext } from "react-router-dom";

import "./Profile.css";

function Profile() {
  const { isAvailable, setIsAvailable } = useOutletContext();

  const [isEditing, setIsEditing] = useState(false);

  const [updatingAvailability, setUpdatingAvailability] =
    useState(false);

  const [profile, setProfile] = useState({
    name: "Delivery Partner",
    email: "delivery@flavorfeast.com",
    phone: "+91 98765 43210",
  });

  // =========================================
  // LOAD DELIVERY USER
  // =========================================

  useEffect(() => {
    const savedUser = localStorage.getItem("deliveryUser");

    if (!savedUser) {
      return;
    }

    try {
      const user = JSON.parse(savedUser);

      setProfile((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
      }));
    } catch (error) {
      console.error("Load Delivery User Error:", error);
    }
  }, []);

  // =========================================
  // PROFILE INPUT
  // =========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================
  // SAVE PROFILE
  // =========================================

  const handleSave = (e) => {
    e.preventDefault();

    setIsEditing(false);

    console.log(
      "Updated Delivery Partner Profile:",
      profile
    );
  };

  // =========================================
  // UPDATE AVAILABILITY
  // =========================================

  const handleAvailabilityToggle = async () => {
    if (updatingAvailability) {
      return;
    }

    const newAvailability = !isAvailable;

    try {
      setUpdatingAvailability(true);

      const token = localStorage.getItem("deliveryToken");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/delivery/availability`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            isAvailable: newAvailability,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update availability."
        );
      }

      // Update shared availability state
      setIsAvailable(data.user.isAvailable);

      // Keep localStorage synchronized
      const savedUser = localStorage.getItem("deliveryUser");

      if (savedUser) {
        const user = JSON.parse(savedUser);

        localStorage.setItem(
          "deliveryUser",
          JSON.stringify({
            ...user,
            isAvailable: data.user.isAvailable,
          })
        );
      }
    } catch (error) {
      console.error(
        "Update Availability Error:",
        error
      );

      alert(
        error.message ||
          "Something went wrong while updating availability."
      );
    } finally {
      setUpdatingAvailability(false);
    }
  };

  return (
    <section className="profile-page">
      <div className="profile-container">

        {/* =========================================
            PAGE HEADER
        ========================================= */}

        <div className="profile-header">
          <div>
            <h1>Profile</h1>

            <p>
              Manage your delivery partner account.
            </p>
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

        {/* =========================================
            PROFILE CARD
        ========================================= */}

        <div className="profile-card">

          {/* Profile Overview */}

          <div className="profile-overview">
            <div className="profile-avatar-large">
              DP
            </div>

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
                <label htmlFor="name">
                  Full Name
                </label>

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
                <label htmlFor="email">
                  Email Address
                </label>

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
                <label htmlFor="phone">
                  Phone Number
                </label>

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
                <label htmlFor="role">
                  Role
                </label>

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

        {/* =========================================
            AVAILABILITY CARD
        ========================================= */}

        <div className="profile-card availability-card">

          <div className="availability-card-header">

            <div>
              <h2>Delivery Availability</h2>

              <p>
                Your current availability status for receiving orders.
              </p>
            </div>

            <span
              className={`availability-status ${
                isAvailable
                  ? "available"
                  : "unavailable"
              }`}
            >
              <span className="availability-status-dot"></span>

              {isAvailable
                ? "Available"
                : "Unavailable"}
            </span>

          </div>

          <div className="availability-info">

            <span>
              {isAvailable
                ? "You are currently available to receive new deliveries."
                : "You are currently unavailable to receive new deliveries."}
            </span>

            <button
              type="button"
              className="availability-toggle-btn"
              onClick={handleAvailabilityToggle}
              disabled={updatingAvailability}
            >
              {updatingAvailability
                ? "Updating..."
                : isAvailable
                ? "Set Unavailable"
                : "Set Available"}
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Profile;