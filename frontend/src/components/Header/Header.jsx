import "./Header.css";
import { useNavigate } from "react-router-dom";

function Header({ cartCount, user, onLogout }) {
  const navigate = useNavigate();

  const navLinks = ["Home", "Menu", "Categories", "About", "Contact"];

  const goToFavorites = () => {
    navigate("/");

    setTimeout(() => {
      document.getElementById("favorites")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <header className="header">
      <div className="container header-container">

        {/* Logo */}
        <div className="logo">
          <h2>Flavor Feast</h2>
        </div>

        {/* Navigation */}
        <nav className="navbar">
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`}>
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Side */}
        <div className="header-actions">

          {/* Customer Account */}
          {user ? (
            <div className="user-account">
              <span className="user-name">
                Hi, {user.name}
              </span>

              <button
                className="logout-btn"
                onClick={onLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              className="login-header-btn"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}

          {/* Favorites */}
          <button
            className="favorite-header-btn"
            onClick={goToFavorites}
          >
            ♥
          </button>

          {/* Cart */}
          <button
            className="cart-btn"
            onClick={() => navigate("/cart")}
          >
            🛒 <span>{cartCount}</span>
          </button>

          {/* Order Now */}
          <button
            className="order-btn"
            onClick={() => navigate("/cart")}
          >
            Order Now
          </button>

        </div>
      </div>
    </header>
  );
}

export default Header;