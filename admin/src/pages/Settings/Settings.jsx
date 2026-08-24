import { useState } from "react";
import "./Settings.css";

function Settings() {
  const [settings, setSettings] = useState({
    adminName: "Flavor Feast Admin",
    email: "admin@flavorfeast.com",
    phone: "+91 98765 43210",

    storeName: "Flavor Feast",
    storeEmail: "contact@flavorfeast.com",
    storePhone: "+91 98765 43210",
    address: "Mumbai, Maharashtra",

    acceptOrders: true,
    autoConfirm: false,
    allowCancellation: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggle = (name) => {
    setSettings((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Backend logic will be added later.
    console.log("Settings:", settings);
  };

  return (
    <div className="settings-page">

      {/* Page Header */}
      <div className="settings-header">
        <div>
          <h1>Settings</h1>
          <p>
            Manage your admin account, store and order preferences.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>

        {/* Account Settings */}
        <section className="settings-card">

          <div className="settings-card-header">
            <h2>Account Settings</h2>
            <p>Manage your administrator account information.</p>
          </div>

          <div className="settings-form-grid">

            <div className="settings-field">
              <label htmlFor="adminName">
                Admin Name
              </label>

              <input
                id="adminName"
                name="adminName"
                type="text"
                value={settings.adminName}
                onChange={handleChange}
              />
            </div>

            <div className="settings-field">
              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={settings.email}
                onChange={handleChange}
              />
            </div>

            <div className="settings-field">
              <label htmlFor="phone">
                Phone
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                value={settings.phone}
                onChange={handleChange}
              />
            </div>

          </div>

        </section>

        {/* Store Settings */}
        <section className="settings-card">

          <div className="settings-card-header">
            <h2>Store Information</h2>
            <p>Manage your Flavor Feast store information.</p>
          </div>

          <div className="settings-form-grid">

            <div className="settings-field">
              <label htmlFor="storeName">
                Store Name
              </label>

              <input
                id="storeName"
                name="storeName"
                type="text"
                value={settings.storeName}
                onChange={handleChange}
              />
            </div>

            <div className="settings-field">
              <label htmlFor="storeEmail">
                Store Email
              </label>

              <input
                id="storeEmail"
                name="storeEmail"
                type="email"
                value={settings.storeEmail}
                onChange={handleChange}
              />
            </div>

            <div className="settings-field">
              <label htmlFor="storePhone">
                Phone
              </label>

              <input
                id="storePhone"
                name="storePhone"
                type="tel"
                value={settings.storePhone}
                onChange={handleChange}
              />
            </div>

            <div className="settings-field full-width">
              <label htmlFor="address">
                Address
              </label>

              <textarea
                id="address"
                name="address"
                value={settings.address}
                onChange={handleChange}
                rows="3"
              />
            </div>

          </div>

        </section>

        {/* Order Settings */}
        <section className="settings-card">

          <div className="settings-card-header">
            <h2>Order Settings</h2>
            <p>Control how customer orders are handled.</p>
          </div>

          <div className="settings-options">

            {/* Accept Orders */}
            <div className="settings-option">

              <div>
                <h3>Accept Orders</h3>
                <p>
                  Allow customers to place new orders.
                </p>
              </div>

              <button
                type="button"
                className={`toggle ${
                  settings.acceptOrders ? "active" : ""
                }`}
                onClick={() => handleToggle("acceptOrders")}
                aria-label="Toggle accepting orders"
              >
                <span></span>
              </button>

            </div>

            {/* Auto Confirm */}
            <div className="settings-option">

              <div>
                <h3>Auto-confirm Orders</h3>
                <p>
                  Automatically confirm new customer orders.
                </p>
              </div>

              <button
                type="button"
                className={`toggle ${
                  settings.autoConfirm ? "active" : ""
                }`}
                onClick={() => handleToggle("autoConfirm")}
                aria-label="Toggle auto-confirm orders"
              >
                <span></span>
              </button>

            </div>

            {/* Cancellation */}
            <div className="settings-option">

              <div>
                <h3>Allow Cancellation</h3>
                <p>
                  Allow customers to cancel eligible orders.
                </p>
              </div>

              <button
                type="button"
                className={`toggle ${
                  settings.allowCancellation ? "active" : ""
                }`}
                onClick={() =>
                  handleToggle("allowCancellation")
                }
                aria-label="Toggle order cancellation"
              >
                <span></span>
              </button>

            </div>

          </div>

        </section>

        {/* Actions */}
        <div className="settings-actions">

          <button
            type="button"
            className="settings-cancel-button"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="settings-save-button"
          >
            Save Changes
          </button>

        </div>

      </form>

    </div>
  );
}

export default Settings;