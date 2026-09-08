import "./FoodCard.css";

function FoodCard({
  item,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  toggleFavorite,
  isFavorite,
  quantity,
}) {
  console.log("FOOD CARD:", item.name, item.image);

  const isOutOfStock = item.stock <= 0;
  const isUnavailable = item.isAvailable === false;
  const cannotOrder = isOutOfStock || isUnavailable;

  return (
    <div className="food-card">
      {/* Food Image */}
      <div className="food-image">
        <img
          src={item.image}
          alt={item.name}
          onError={(e) => {
            console.error(
              "IMAGE FAILED:",
              item.name,
              item.image
            );
          }}
        />
      </div>

      {/* Food Details */}
      <div className="food-details">
        {/* Header */}
        <div className="food-header">
          <h3>{item.name}</h3>

          <button
            className={`favorite-btn ${
              isFavorite ? "active" : ""
            }`}
            onClick={() => toggleFavorite(item)}
          >
            {isFavorite ? "♥" : "♡"}
          </button>
        </div>

        {/* Category */}
        <p>{item.category}</p>

        {/* Availability */}
        {isUnavailable ? (
          <p className="stock-status unavailable">
            Unavailable
          </p>
        ) : isOutOfStock ? (
          <p className="stock-status out-of-stock">
            Out of Stock
          </p>
        ) : (
          <p className="stock-status">
            {item.stock} available
          </p>
        )}

        {/* Footer */}
        <div className="food-footer">
          <span>₹{item.price}</span>

          {cannotOrder ? (
            <button disabled>
              {isUnavailable ? "Unavailable" : "Out of Stock"}
            </button>
          ) : quantity === 0 ? (
            <button onClick={() => addToCart(item)}>
              Add to Cart
            </button>
          ) : (
            <div className="quantity-controls">
              <button
                onClick={() => decreaseQuantity(item.id)}
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                onClick={() => increaseQuantity(item.id)}
                disabled={quantity >= item.stock}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FoodCard;