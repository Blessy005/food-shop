import "../styles/FoodList.css";
import FoodCard from "./FoodCard";
import foods from "../data/foods";

function FoodList({ addToCart }) {
  return (
    <section className="food-list">
      <h2 className="food-title">Popular Foods</h2>

      <div className="food-container">
        {foods.map((food) => (
          <FoodCard
            key={food.id}
            food={food}
            addToCart={addToCart}
          />
        ))}
      </div>
    </section>
  );
}

export default FoodList;