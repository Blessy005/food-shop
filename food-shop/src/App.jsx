import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header/Header";
import HeroSection from "./components/HeroSection/HeroSection";
import CategorySection from "./components/CategorySection/CategorySection";
import AboutSection from "./components/AboutSection/AboutSection";
import FoodList from "./components/FoodList/FoodList";
import MenuSection from "./components/MenuSection/MenuSection";
import Favorites from "./components/Favorites/Favorites";
import Cart from "./components/Cart/Cart";
import SearchBar from "./components/SearchBar/SearchBar";
import Checkout from "./components/Checkout/Checkout";
import OrderPlaced from "./components/OrderPlaced/OrderPlaced";
import ContactSection from "./components/ContactSection/ContactSection";

function App() {
  // Cart
  const [cart, setCart] = useState([]);

  // Favorites
  const [favorites, setFavorites] = useState([]);

  // Selected Category
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Search
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

  // Remove item
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Clear cart after placing order
  const clearCart = () => {
    setCart([]);
  };

  // Add / Remove Favorites
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
        <Header cartCount={cartCount} />

        <Routes>
          {/* Landing Page */}
          <Route
            path="/"
            element={
              <>
                <HeroSection />

                <AboutSection />

                {/* Browse by Category */}
                <CategorySection
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />

                <SearchBar
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />

                {/* Food List */}
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

                {/* Popular Menu */}
                <MenuSection
                  addToCart={addToCart}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                  cart={cart}
                  toggleFavorite={toggleFavorite}
                  favorites={favorites}
                />

                {/* Favorites */}
                <Favorites
                  favorites={favorites}
                  addToCart={addToCart}
                  toggleFavorite={toggleFavorite}
                />

                <ContactSection />
              </>
            }
          />

          {/* Cart Page */}
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

          {/* Checkout Page */}
          <Route
            path="/checkout"
            element={<Checkout cart={cart} clearCart={clearCart} />}
          />
          {/* Order Placed Page */}
          <Route path="/order-placed" element={<OrderPlaced />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
