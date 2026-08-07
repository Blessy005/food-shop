import "./MenuSection.css";
import menuData from "../../data/menuData";
import FoodCard from "../FoodCard/FoodCard";

function MenuSection({ addToCart }) {
  return (
    <section className="menu" id="menu">
      <div className="container">
        <div className="section-title">
          <h2>Our Popular Menu</h2>
          <p>Explore our delicious dishes made with fresh ingredients.</p>
        </div>

        <div className="menu-grid">
          {menuData.map((item) => (
            <FoodCard key={item.id} item={item} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default MenuSection;
