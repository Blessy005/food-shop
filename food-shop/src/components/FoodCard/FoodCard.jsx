import "./FoodCard.css";

function FoodCard({
  item,
  addToCart,
  toggleFavorite,
  isFavorite,
}) {
  return (
    <div className="food-card">
      <div className="food-image">
        Food Image
      </div>

      <div className="food-details">
        <div className="food-header">
          <h3>{item.name}</h3>

          <button
            className={`favorite-btn ${isFavorite ? "active" : ""}`}
            onClick={() => toggleFavorite(item)}
          >
            {isFavorite ? "♥" : "♡"}
          </button>
        </div>

        <p>{item.category}</p>

        <div className="food-footer">
          <span>₹{item.price}</span>

          <button onClick={() => addToCart(item)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;