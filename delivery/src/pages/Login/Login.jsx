import { useState } from "react";

import { useNavigate } from "react-router-dom";

import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Login failed"
        );
      }

      // Only delivery partners can access this portal
      if (data.user.role !== "delivery") {
        throw new Error(
          "This account is not a delivery partner account."
        );
      }

      // Save delivery authentication
      localStorage.setItem(
        "deliveryToken",
        data.token
      );

      localStorage.setItem(
        "deliveryUser",
        JSON.stringify(data.user)
      );

      navigate("/dashboard");
    } catch (error) {
      console.error("Delivery Login Error:", error);

      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="delivery-login-page">
      <div className="delivery-login-card">

        {/* Brand */}
        <div className="delivery-login-brand">
          <h1>Flavor Feast</h1>
          <span>Delivery Partner</span>
        </div>

        {/* Header */}
        <div className="delivery-login-header">
          <h2>Welcome Back</h2>
          <p>Login to manage your deliveries.</p>
        </div>

        {/* Login Form */}
        <form
          className="delivery-login-form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="delivery-login-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="delivery-login-footer">
          Flavor Feast Delivery Partner Portal
        </p>

      </div>
    </div>
  );
}

export default Login;