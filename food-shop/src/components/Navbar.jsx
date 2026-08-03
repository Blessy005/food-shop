import { forwardRef } from "react";
import "../styles/Navbar.css";

const Navbar = forwardRef(({ cartCount }, cartRef) => {
  return (
    <nav className="navbar">
      <h2 className="logo">🍴 Food Shop</h2>

      <ul className="nav-links">
        <li>Home</li>
        <li>Menu</li>
        <li>Contact</li>
      </ul>

      <div className="cart" ref={cartRef}>
        🛒 <span>{cartCount}</span>
      </div>
    </nav>
  );
});

export default Navbar;