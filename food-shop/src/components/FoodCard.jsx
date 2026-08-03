import "../styles/FoodCard.css";

function FoodCard({ food, addToCart }) {
  return (
    <div className="food-card">

      <div className="food-image">
        {/* Replace with an <img> later */}
        Food Image
      </div>

      <div className="food-details">
        <h3>{food.name}</h3>

        <p className="price">₹{food.price}</p>

        <p className="rating">{food.rating}</p>

        <button onClick={addToCart}>
          Add to Cart
        </button>
      </div>

    </div>
  );
}

export default FoodCard;