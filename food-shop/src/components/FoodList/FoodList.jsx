import "./FoodList.css";
import menuData from "../../data/menuData";
import FoodCard from "../FoodCard/FoodCard";

function FoodList({
  selectedCategory,
  addToCart,
  toggleFavorite,
  favorites,
}) {
  const filteredFoods =
    selectedCategory === "All"
      ? menuData
      : menuData.filter(
          (item) => item.category === selectedCategory
        );

  return (
    <section className="food-list" id="food-list">
      <div className="container">

        <div className="section-title">
          <h2>
            {selectedCategory === "All"
              ? "All Foods"
              : `${selectedCategory} Foods`}
          </h2>

          <p>
            Explore delicious dishes from our menu.
          </p>
        </div>

        {filteredFoods.length === 0 ? (
          <p className="no-foods">
            No foods found in this category.
          </p>
        ) : (
          <div className="food-list-grid">
            {filteredFoods.map((item) => {
              const isFavorite = favorites.some(
                (favorite) => favorite.id === item.id
              );

              return (
                <FoodCard
                  key={item.id}
                  item={item}
                  addToCart={addToCart}
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