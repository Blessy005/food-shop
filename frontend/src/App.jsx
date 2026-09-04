import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Header from "./components/Header/Header";
import HeroSection from "./components/HeroSection/HeroSection";
import MenuSection from "./components/MenuSection/MenuSection";
import CategorySection from "./components/CategorySection/CategorySection";
import SearchBar from "./components/SearchBar/SearchBar";
import FoodList from "./components/FoodList/FoodList";
import AboutSection from "./components/AboutSection/AboutSection";
import ContactSection from "./components/ContactSection/ContactSection";
import Favorites from "./components/Favorites/Favorites";

import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import OrderPlaced from "./components/OrderPlaced/OrderPlaced";

import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Orders from "./components/Orders/Orders";

function App() {
  // Customer authentication
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("customerUser");

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser);
    } catch (error) {
      console.error("Failed to load customer user:", error);
      localStorage.removeItem("customerUser");
      localStorage.removeItem("customerToken");
      return null;
    }
  });

  // Customer logout
  const handleLogout = () => {
    localStorage.removeItem("customerToken");
    localStorage.removeItem("customerUser");
    setUser(null);
  };

  // Cart
  const [cart, setCart] = useState([]);

  // Favorites
  const [favorites, setFavorites] = useState([]);

  // Category and search
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Add item to cart
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem,
        );
      }

      return [
        ...prevCart,
        {
          ...item,
          quantity: 1,
        },
      ];
    });
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Clear cart after placing order
  const clearCart = () => {
    setCart([]);
  };

  // Add or remove favorites
  const toggleFavorite = (item) => {
    setFavorites((prevFavorites) => {
      const alreadyFavorite = prevFavorites.some(
        (favorite) => favorite.id === item.id,
      );

      if (alreadyFavorite) {
        return prevFavorites.filter((favorite) => favorite.id !== item.id);
      }

      return [...prevFavorites, item];
    });
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <BrowserRouter>
      <div className="App">
        <Header cartCount={cartCount} user={user} onLogout={handleLogout} />

        <Routes>
          {/* Homepage */}
          <Route
            path="/"
            element={
              <>
                {/* Home */}
                <HeroSection />

                {/* Popular Menu */}
                <MenuSection
                  addToCart={addToCart}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                  cart={cart}
                  toggleFavorite={toggleFavorite}
                  favorites={favorites}
                />

                {/* Categories */}
                <CategorySection
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />

                {/* Explore Full Menu */}
                <SearchBar
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />

                <FoodList
                  selectedCategory={selectedCategory}
                  searchTerm={searchTerm}
                  addToCart={addToCart}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                  cart={cart}
                  toggleFavorite={toggleFavorite}
                  favorites={favorites}
                />

                {/* About */}
                <AboutSection />

                {/* Contact */}
                <ContactSection />
              </>
            }
          />

          {/* Customer Register */}
          <Route path="/register" element={<Register />} />

          {/* Customer Login */}
          <Route
            path="/login"
            element={
              <Login onLogin={(loggedInUser) => setUser(loggedInUser)} />
            }
          />

          {/* Cart */}
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                removeFromCart={removeFromCart}
              />
            }
          />

          {/* Favorites */}
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                addToCart={addToCart}
                toggleFavorite={toggleFavorite}
              />
            }
          />

          {/* Checkout */}
          <Route
            path="/checkout"
            element={<Checkout cart={cart} clearCart={clearCart} />}
          />

          {/* Order confirmation */}
          <Route path="/order-placed" element={<OrderPlaced />} />

          {/* Customer Orders */}
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
