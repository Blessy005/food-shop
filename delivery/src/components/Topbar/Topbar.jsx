import { useState } from "react";

import { useLocation } from "react-router-dom";

import "./Topbar.css";

function Topbar({ isAvailable, setIsAvailable }) {
  const location = useLocation();

  const [updatingAvailability, setUpdatingAvailability] =
    useState(false);

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

  // =========================================
  // TOGGLE AVAILABILITY
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

      // Update shared React state
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
    <header className="delivery-topbar">

      {/* =========================================
          LEFT
      ========================================= */}

      <div className="topbar-left">

        <div className="topbar-title">

          <h1>
            {currentPage.title}
          </h1>

          <p>
            {currentPage.subtitle}
          </p>

        </div>

      </div>

      {/* =========================================
          RIGHT
      ========================================= */}

      <div className="topbar-right">

        {/* =========================================
            AVAILABILITY
        ========================================= */}

        <button
          type="button"
          className={`delivery-status ${
            isAvailable
              ? "available"
              : "unavailable"
          }`}
          onClick={handleAvailabilityToggle}
          disabled={updatingAvailability}
          title={
            isAvailable
              ? "Click to become unavailable"
              : "Click to become available"
          }
        >

          <span className="status-dot"></span>

          <span>
            {updatingAvailability
              ? "Updating..."
              : isAvailable
              ? "Available"
              : "Unavailable"}
          </span>

        </button>

        {/* =========================================
            PROFILE
        ========================================= */}

        <div className="topbar-profile">

          <div className="profile-avatar">
            DP
          </div>

          <div className="profile-info">

            <span className="profile-name">
              Delivery Partner
            </span>

            <span className="profile-role">
              Delivery Partner
            </span>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Topbar;