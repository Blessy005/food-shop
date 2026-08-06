import "./App.css";

import Header from "./components/Header/Header";
import HeroSection from "./components/HeroSection/HeroSection";
import CategorySection from "./components/CategorySection/CategorySection";

function App() {
  return (
    <div className="App">
      <Header />
      <HeroSection />
      <CategorySection />
    </div>
  );
}

export default App;