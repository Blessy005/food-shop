import "./Header.css";

function Header() {
  const navLinks = [
    "Home",
    "Menu",
    "Categories",
    "About",
    "Contact",
  ];

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
          <button className="cart-btn">
            🛒 <span>0</span>
          </button>

          <button className="order-btn">
            Order Now
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;