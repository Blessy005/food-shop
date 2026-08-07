import { useState } from "react";
import "./App.css";

import Header from "./components/Header/Header";
import HeroSection from "./components/HeroSection/HeroSection";
import CategorySection from "./components/CategorySection/CategorySection";
import MenuSection from "./components/MenuSection/MenuSection";
import Cart from "./components/Cart/Cart";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  return (
    <div className="App">
      <Header />

      <HeroSection />

      <CategorySection />

      <MenuSection addToCart={addToCart} />

      <Cart cart={cart} />
    </div>
  );
}

export default App;