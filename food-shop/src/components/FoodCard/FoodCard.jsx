import "./FoodCard.css";

function FoodCard({ item, addToCart }) {
  return (
    <div className="food-card">
      <div className="food-image">Food Image</div>

      <div className="food-details">
        <h3>{item.name}</h3>

        <p>{item.category}</p>

        <div className="food-footer">
          <span>{item.price}</span>

          <button onClick={() => addToCart(item)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
