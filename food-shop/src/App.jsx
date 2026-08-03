import { useState, useRef } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FoodList from "./components/FoodList";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const cartRef = useRef(null);

  const addToCart = () => {
    setCartCount((prev) => prev + 1);

    if (cartRef.current) {
      cartRef.current.classList.add("bounce");

      setTimeout(() => {
        cartRef.current.classList.remove("bounce");
      }, 300);
    }
  };

  return (
    <div className="App">
      <Navbar cartCount={cartCount} ref={cartRef} />

      <Hero />

      <FoodList addToCart={addToCart} />
    </div>
  );
}

export default App;