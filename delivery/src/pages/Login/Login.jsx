import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Backend authentication will be connected later.
    console.log("Delivery Partner Login:", {
      email,
      password,
    });

    navigate("/dashboard");
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
            <label htmlFor="email">Email Address</label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="delivery-login-btn"
          >
            Login
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