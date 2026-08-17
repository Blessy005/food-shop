import "./FoodList.css";
import menuData from "../../data/menuData";
import FoodCard from "../FoodCard/FoodCard";

function FoodList({
  selectedCategory,
  searchTerm,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  cart,
  toggleFavorite,
  favorites,
}) {
  const filteredFoods = menuData.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="food-list" id="food-list">
      <div className="container">
        <div className="section-title">
          <h2>
            {selectedCategory === "All"
              ? "All Foods"
              : `${selectedCategory} Foods`}
          </h2>

          <p>Explore delicious dishes from our menu.</p>
        </div>

        {filteredFoods.length === 0 ? (
          <p className="no-foods">No foods found.</p>
        ) : (
          <div className="food-list-grid">
            {filteredFoods.map((item) => {
              const isFavorite = favorites.some(
                (favorite) => favorite.id === item.id,
              );
              const cartItem = cart.find((cartItem) => cartItem.id === item.id);

              const quantity = cartItem ? cartItem.quantity : 0;

              return (
                <FoodCard
                  key={item.id}
                  item={item}
                  addToCart={addToCart}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                  quantity={quantity}
                  toggleFavorite={toggleFavorite}
                  isFavorite={isFavorite}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default FoodList;
