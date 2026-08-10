import { useState } from "react";
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

  return (
    <div className="App">
      <Header
        cartCount={cart.reduce((total, item) => total + item.quantity, 0)}
      />

      <HeroSection />

      <AboutSection />

      {/* Browse by Category */}
      <CategorySection
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Food List */}
      <FoodList
        selectedCategory={selectedCategory}
        searchTerm={searchTerm}
        addToCart={addToCart}
        toggleFavorite={toggleFavorite}
        favorites={favorites}
      />

      {/* Popular Menu */}
      <MenuSection
        addToCart={addToCart}
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

      {/* Cart */}
      <Cart
        cart={cart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        removeFromCart={removeFromCart}
      />
    </div>
  );
}

export default App;
